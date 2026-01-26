import React from 'react'
import { View, Pressable, Text } from 'react-native'
import { Svg, Polygon, Line } from 'react-native-svg'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { AnimatedDice } from '../game/AnimatedDice'
import { board, resetBoard } from '../game/Board'
import { Dice } from '../game/Dice'
import { getLegalMoves, getOpponent } from '../game/Logic'
import { Piece } from '../game/Piece'
import { useGameStore } from '../game/State'
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
  
  const {
    phase,
    startGame,
    setDice,
    dice,
    currentPlayer,
    remainingMoves,
  } = useGameStore()

  React.useEffect(() => {
    if (whiteRoll > 0 && blackRoll > 0) {
      const starter = determineStarter()
      const label = ucFirst(starter)
      if (starter) {
        setMessage(`${label} has the higher roll and will start...`)
        setTimeout(() => startGame(starter), 2000) // brief pause to show result
      } else {
        setTimeout(() => {
          setWhiteRoll(0)
          setBlackRoll(0)
          setMessage("It's a tie! Roll again...")
        }, 2000) // show tie, then reset
      }
    }
  }, [whiteRoll, blackRoll])

  React.useEffect(() => {
    if (phase !== PHASE.PLAYING || !currentPlayer) return

    if (dice.length > 0) {
      const available = getLegalMoves(currentPlayer, remainingMoves)
      setTimeout(() => {
        setMessage(MSG.EMPTY)
        if (dice[0] === dice[1]) {
          // Just rolled a double
          setMessage(formatMsg(MSG.ROLLED_DOUBLE, { player: ucFirst(currentPlayer) }))
        }
      }, 200)
      setLegal(available)
    } else {
      // Ready to roll
      setMessage(formatMsg(MSG.CAN_ROLL, { player: ucFirst(currentPlayer) }))
      setLegal([])
    }
  }, [phase, currentPlayer, dice])

  React.useEffect(() => {
    if (remainingMoves.length < 1) return

    if (legal.length > 0) {
      console.log("remainingMoves", remainingMoves, "legal moves", legal)
    } else {
      setMessage(formatMsg(MSG.NO_LEGAL_MOVES, {
        player: ucFirst(currentPlayer),
        nextPlayer: ucFirst(getOpponent(currentPlayer))
      }))
    }
  }, [remainingMoves, legal])

  const determineStarter = () => {
    if (whiteRoll === 0 || blackRoll === 0) return null
    if (whiteRoll > blackRoll) return WHITE
    if (blackRoll > whiteRoll) return BLACK

    return null  // tie
  }

  const ExitButton = () => (
    <Pressable style={[styles.button, CS.row, CS.gap]} onPress={onEndGame}>
      <Text style={CS.buttonText}>Exit</Text>
      <Icon name="exit-to-app" size={20} color={COLOURS.white} />
    </Pressable>
  )

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
      <RollButton onPress={() => roll(currentPlayer)} />
      :
      <>
        <AnimatedDice color={currentPlayer} />
        <AnimatedDice color={currentPlayer} />
      </>

    if (dice.length > 0) {
      if (dice[0] === dice[1]) {
        content = <>
          <Dice value={dice[0]} inverted={inverted} />
          <Dice value={dice[0]} inverted={inverted} />
          <Dice value={dice[0]} inverted={inverted} />
          <Dice value={dice[0]} inverted={inverted} />
        </>
      } else {
        content = <>
          <Dice value={dice[0]} inverted={inverted} />
          <Dice value={dice[1]} inverted={inverted} />
        </>
      }
    }

    return (
      <View style={styles.controls}>
        <Text style={styles.message}>{message}</Text>

        <View style={[CS.row, CS.gap]}>{content}</View>

        <ExitButton />
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
      <ExitButton />
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
            const canMove = validFrom.includes(position)

            return (
              <View key={idx}>
                <View style={{ transform: [{ rotate: `${rotation}deg` }] }}>
                  <Triangle fill={fill} highlight={canMove} />
                </View>
                
                {
                  point.count > 0 && (
                    <View style={[styles.tile, rotation === 180 ? { top: 0 } : { bottom: 0 }]}>
                      {
                        Array(point.count).fill().map((_, i) => (
                          <View key={i}>
                            <Piece color={point.color} />
                          </View>
                        ))
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

  const RollButton = ({ player = null, onPress }) => {
    const isWhite = player === WHITE
    const bg = !player ? CS.bgBlue : CS.bgBlack

    return (
      <Pressable style={[CS.button, CS.align, isWhite ? CS.bgWhite : bg]} onPress={onPress}>
        <Text style={[CS.buttonText, isWhite && CS.buttonTextDark]}>Roll</Text>
      </Pressable>
    )
  }

  const Triangle = ({ fill, highlight = false, width = 40, height = 120 }) => {
    const points = `0,${height} ${width / 2},0 ${width},${height}`

    return (
      <Svg width={width} height={height}>
        <Polygon points={points} fill={fill} />
        {highlight && (
          <Line
            x1="0"
            y1={height}
            x2={width}
            y2={height}
            stroke={COLOURS.green}
            strokeWidth="4"
          />
        )}
      </Svg>
    )
  }

  resetBoard()

  return (
    <View style={[styles.container, isOpening() ? CS.bgBlue : null]}>
      {
      isOpening()
        ?
        renderOpeningRoll()
        :
        <View style={styles.board}>
          {renderControls()}
          {renderBoard()}
          {renderGutter()}
        </View>
      }
    </View>
  )
}

export default GameScreen