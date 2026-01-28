import React from 'react'
import { View, Text, Dimensions } from 'react-native'

import { AnimatedDice } from '../components/AnimatedDice'
import { Dice } from '../components/Dice'
import { DraggablePiece } from "../components/DraggablePiece"
import { ExitButton } from '../components/ExitButton'
import { getOpponent, getDestination } from '../components/Logic'
import { Piece } from '../components/Piece'
import { RollButton } from "../components/RollButton"
import { useGameStore } from '../components/State'
import { Triangle } from "../components/Triangle"
import CS from '../styles/CommonStyles'
import styles from '../styles/GameStyles'
import { COLOURS } from '../utils/colours'
import { PHASE, BLACK, WHITE, MSG } from '../utils/constants'
import { getRoll, ucFirst, formatMsg } from '../utils/helpers'

const GameScreen = ({ onEndGame }) => {
  const [message, setMessage] = React.useState('')
  const [resolving, setResolving] = React.useState(null)
  const [whiteRoll, setWhiteRoll] = React.useState(0)
  const [blackRoll, setBlackRoll] = React.useState(0)
  const [legal, setLegal] = React.useState([])
  const [dragging, setDragging] = React.useState(null) // { from, pieceX, pieceY }
  const [validDestinations, setValidDestinations] = React.useState([])
  const [places, setPlaces] = React.useState({})

  const topHalf = Dimensions.get('window').height / 2
  const {
    board,
    bar,
    bearOff,
    currentPlayer,
    dice,
    remainingMoves,
    phase,
    rolls,
    resetBoard,
    applyMove,
    canBearOff,
    executeMove,
    getLegalMoves,
    setDice,
    switchPlayer,
    startGame,
  } = useGameStore()

  React.useEffect(() => {
    const determineStarter = () => {
      if (whiteRoll === 0 || blackRoll === 0) return null
      if (whiteRoll > blackRoll) return WHITE
      if (blackRoll > whiteRoll) return BLACK

      return null  // tie
    }

    if (whiteRoll > 0 && blackRoll > 0) {
      const starter = determineStarter()
      if (starter) {
        console.log(starter)
        setMessage(formatMsg(MSG.START, { player: ucFirst(starter) }))
        startGame(starter)
      } else {
        setTimeout(() => {
          setWhiteRoll(0)
          setBlackRoll(0)
          setMessage(MSG.TIE)
        }, 1500)
      }
    }
  }, [whiteRoll, blackRoll, startGame])

  React.useEffect(() => {
    if (phase !== PHASE.PLAYING || !currentPlayer) return

    if (dice.length > 0) {
      setMessage(MSG.EMPTY)
      const available = getLegalMoves(currentPlayer, remainingMoves)
      setLegal(available)

      if (!available.length) {
        if (remainingMoves.length < dice.length) {
          switchPlayer()
        } else {
          setMessage(formatMsg(MSG.NO_LEGAL_MOVES, {
            player: ucFirst(currentPlayer),
            nextPlayer: ucFirst(getOpponent(currentPlayer))
          }))
          setTimeout(() => {
            switchPlayer()
          }, 2000)
        }
        return
      }

      if (dice[0] === dice[1]) {
        // Just rolled a double
        setMessage(formatMsg(MSG.DOUBLE, { player: ucFirst(currentPlayer) }))
      }
    } else {
      setLegal([])
    }
  }, [phase, currentPlayer, dice, remainingMoves, rolls, getLegalMoves, switchPlayer])

  const findDestination = (dropX, dropY) => {
    const isTop = dropY < topHalf
    const matches = validDestinations.filter(dest => isTop === dest < 13)

    for (const dest of matches) {
      const x = places[dest]
      if (x === undefined) continue

      const leftBound = x - 15
      const rightBound = x + 55

      if (dropX >= leftBound && dropX <= rightBound) {
        return dest
      }
    }

    console.log('no match')
    return null  // stub for now
  }

  const handleDragEnd = () => {
    setDragging(null)
    setValidDestinations([])
  }

  const handleDragStart = (from) => {
    setDragging(from)

    // Augment legal with combinations
    const legalMoves = [...legal]
    for (let i = 2; i <= remainingMoves.length; i++) {
      const sum = remainingMoves.slice(0, i).reduce((acc, val) => acc + val, 0)
      const comboMoves = getLegalMoves(currentPlayer, [sum])
      legalMoves.push(...comboMoves)
    }

    setLegal(legalMoves)
    const destinations = legalMoves
      .filter(m => m.from === from)
      .map(m => getDestination(from, m.roll, currentPlayer))
    setValidDestinations(destinations)
  }

  const handleDrop = (from, absoluteX, absoluteY) => {
    const destPoint = findDestination(absoluteX, absoluteY)
    if (!destPoint) return

    const validMove = legal.find(m =>
      m.from === from &&
      getDestination(from, m.roll, currentPlayer) === destPoint
    )

    if (validMove) {
      applyMove(from, validMove.roll, currentPlayer)
      executeMove(validMove.roll)
    }
  }

  const isOpening = () => phase === PHASE.OPENING;

  const renderBoard = () => (
    <View>
      <View style={styles.board}>
        <View style={[styles.frame, styles.flex]}>
          <View style={styles.frameTop}>{renderPoints(12, 7)}</View>
          <View style={styles.frameBottom}>{renderPoints(13, 18)}</View>
        </View>
        <View style={[styles.frame, styles.flex]}>
          <View style={styles.frameTop}>{renderPoints(6, 1)}</View>
          <View style={styles.frameBottom}>{renderPoints(19, 24)}</View>
        </View>
      </View>
    </View>
  )

  const renderControls = () => {
    if (!currentPlayer) return null

    const inverted = currentPlayer === BLACK
    let content = !resolving
      ?
      <RollButton currentPlayer={currentPlayer} onPress={() => roll(currentPlayer)} />
      :
      <>
        <AnimatedDice color={currentPlayer} />
        <AnimatedDice color={currentPlayer} />
      </>

    if (dice.length > 0) {
      if (dice[0] === dice[1]) {
        const usedCount = 4 - remainingMoves.length
        content = <>
          <Dice value={dice[0]} inverted={inverted} used={usedCount > 0} />
          <Dice value={dice[0]} inverted={inverted} used={usedCount > 1} />
          <Dice value={dice[0]} inverted={inverted} used={usedCount > 2} />
          <Dice value={dice[0]} inverted={inverted} used={usedCount > 3} />
        </>
      } else {
        const usedDice = dice.filter(d => !remainingMoves.includes(d))
        console.log(usedDice)
        content = <>
          <Dice value={dice[0]} inverted={inverted} used={usedDice.includes(dice[0])} />
          <Dice value={dice[1]} inverted={inverted} used={usedDice.includes(dice[1])} />
        </>
      }
    }

    return (
      <View style={styles.controls}>
        <Text style={styles.message}>{message}</Text>

        <View style={[CS.row, CS.gap]}>{content}</View>

        <ExitButton onEndGame={onEndGame} />
      </View>
    )
  }

  const renderGutter = () => (
    <View style={styles.gutter}>
        <View style={[styles.frame, styles.sideFrame]} />
        <View style={[styles.frame, styles.sideFrame, styles.cubeFrame]} />
        <View style={[styles.frame, styles.sideFrame]} />
      </View>
  )

  const renderOpeningRoll = () => (
    <View style={CS.container}>
      <Text style={styles.text}>{message || 'Roll to determine who starts'}</Text>

      <View style={CS.row}>
        <View style={styles.rollSection}>
          {whiteRoll > 0 && <Dice value={whiteRoll} />}
          {whiteRoll === 0 && (
            resolving === WHITE
              ? <AnimatedDice color={WHITE} />
              : <RollButton player={WHITE} onPress={() => roll(WHITE)} />
          )}
        </View>

        <View style={styles.rollSection}>
          {blackRoll > 0 && <Dice value={blackRoll} inverted />}
          {blackRoll === 0 && (
            resolving === BLACK
              ? <AnimatedDice color={BLACK} />
              : <RollButton player={BLACK} onPress={() => roll(BLACK)} />
          )}
        </View>
      </View>
      <ExitButton onEndGame={onEndGame} />
    </View>
  )

  const renderPoints = (start, end) => {
    const rotation = start < 13 ? 180 : 0
    const ascending = end > start
    const points = ascending
     ? board.slice(start, end + 1)
     : board.slice(end, start + 1).reverse()
    const validFrom = [...new Set(legal.map(m => m.from))]

    return (
      <View style={[CS.row, CS.wrap]}>
        {
          points.map((point, idx) => {
            const fill = idx % 2 === 0 ? COLOURS.beige : COLOURS.darkGrey
            const position = ascending ? start + idx : start - idx
            const canMoveFrom = validFrom.includes(position)
            const canMoveTo = validDestinations.includes(position)

            return (
              <View
                key={idx}
                ref={(viewRef) => {
                  if (viewRef && !places[position]) {
                    setTimeout(() => {
                      viewRef.measure((x, y, width, height, pageX) => {
                        setPlaces(prev => ({ ...prev, [position]: pageX }))
                      })
                    }, 0)
                  }
                }}
              >
                <View style={{ transform: [{ rotate: `${rotation}deg` }] }}>
                  <Triangle fill={fill} source={canMoveFrom && !dragging} dest={canMoveTo} />
                </View>
                
                {
                  point.count > 0 && (
                    <View style={[styles.tile, rotation === 180 ? CS.top : CS.bottom]}>
                      {
                      Array(point.count).fill().map((_, i) => {
                        const isTopPiece = rotation === 180 ? i === point.count - 1 : i === 0
                        
                        if (isTopPiece && canMoveFrom) {
                          return <DraggablePiece
                            key={i}
                            color={point.color}
                            from={position}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDrop={handleDrop}
                          />
                        }
                        
                        return (
                          <View key={i}>
                            <Piece color={point.color} />
                          </View>
                        )
                      })
                      }
                    </View>
                  )
                }
              </View>
            )
          })
        }
      </View>
    )
  }

  const roll = (player) => {
    setResolving(player)
    setMessage('')
    setTimeout(() => {
      const die1 = getRoll()
      if (phase === PHASE.PLAYING) {
        // Gameplay roll - two dice
        const die2 = getRoll()
        setDice(die1, die2)
      } else {
        // Opening roll - single die
        player === WHITE ? setWhiteRoll(die1) : setBlackRoll(die1)
      }
      setResolving(null)
    }, 840)
  }

  return (
    <View style={[styles.container, isOpening() ? CS.bgBlue : null]}>
      {
      isOpening()
        ?
        renderOpeningRoll()
        :
        <View style={styles.board}>
          {renderControls()}
          <>
            {renderBoard()}
            {renderGutter()}
          </>
        </View>
      }
    </View>
  )
}

export default GameScreen