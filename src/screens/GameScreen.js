import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Orientation from 'react-native-orientation-locker'

import ProviderFactory from "../components/AI/ProviderFactory"
import { AnimatedDice } from '../components/AnimatedDice'
import { Cube } from '../components/Cube'
import { Dice } from '../components/Dice'
import { DoublingButton } from '../components/DoublingButton'
import { DraggablePiece } from '../components/DraggablePiece'
import { ExitButton } from '../components/ExitButton'
import { getOpponent, getDestination } from '../components/Logic'
import { Offer } from '../components/Offer'
import { Piece } from '../components/Piece'
import { RollButton } from '../components/RollButton'
import { Scoreboard } from '../components/Scoreboard'
import { SidePiece } from '../components/SidePiece'
import { useGameStore } from '../components/State'
import { ThinkingIndicator } from "../components/ThinkingIndicator"
import { Triangle } from '../components/Triangle'
import CS from '../styles/CommonStyles'
import styles from '../styles/GameStyles'
import { COLOURS } from '../utils/colours'
import {
  LANDSCAPE_LEFT,
  LANDSCAPE_RIGHT,
  PHASE,
  BLACK,
  WHITE,
  MSG,
  BACKGAMMON,
  GAMMON,
} from '../utils/constants'
import { getRoll, ucFirst, formatMsg, moveToRoll } from '../utils/helpers'

const GameScreen = ({ onEndGame }) => {
  const insets = useSafeAreaInsets()
  const [orientation, setOrientation] = React.useState(LANDSCAPE_RIGHT)
  const [message, setMessage] = React.useState('')
  const [resolving, setResolving] = React.useState(null)
  const [whiteRoll, setWhiteRoll] = React.useState(0)
  const [blackRoll, setBlackRoll] = React.useState(0)
  const [legal, setLegal] = React.useState([])
  const [dragging, setDragging] = React.useState(null) // { from, pieceX, pieceY }
  const [validDestinations, setValidDestinations] = React.useState([])
  const [places, setPlaces] = React.useState({})
  const [showDouble, setShowDouble] = React.useState(false)
  const [provider, setProvider] = React.useState(null)
  const [thinking, setThinking] = React.useState(false)

  const topHalf = Dimensions.get('window').height / 2
  const {
    points,
    board,
    bar,
    bearOff,
    clearSavedGame,
    currentPlayer,
    dice,
    remainingMoves,
    stake,
    hasCube,
    phase,
    ai,
    difficulty,
    audio,
    acceptDouble,
    endGame,
    resetBoard,
    applyMove,
    executeMove,
    getLegalMoves,
    setDice,
    switchPlayer,
    startGame,
    saveGame,
    updatePoints,
  } = useGameStore()
  const isAiTurn = ai && currentPlayer === BLACK
  const safeArea = orientation === LANDSCAPE_LEFT
    ? { paddingLeft: insets.left }
    : { paddingRight: insets.right }

  const canDouble = () => {
    if (!currentPlayer || stake >= 64) return false
    return hasCube === null || hasCube === currentPlayer
  }

  React.useEffect(() => {
    Orientation.lockToLandscape()
    const initial = Orientation.getInitialOrientation()
    setOrientation(initial)

    Orientation.addOrientationListener(setOrientation)
    return () => Orientation.removeOrientationListener(setOrientation)
  }, [])

  React.useEffect(() => {
    if (!ai) return

    ProviderFactory.create().then(p => {
      p.setDifficulty(difficulty)
      setProvider(p)
      console.log(p.getName())
    })
  }, [ai, difficulty])

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
    if (ai && whiteRoll > 0 && blackRoll === 0 && !resolving) {
      setTimeout(() => roll(BLACK), 300)
    }
  }, [whiteRoll, blackRoll, ai, resolving])
  
  React.useEffect(() => {
    const go = ai && provider && currentPlayer === BLACK && phase === PHASE.PLAYING
    if (!go) return
    
    if (dice.length < 1) {
      if (canDouble()) {
        setThinking(true)
        const checkDouble = async () => {
          const yes = await provider.shouldDouble({ board, bar })
          setThinking(false)
          if (yes) {
            showDoubling()
          } else {
            setTimeout(() => roll(BLACK), 2000)
          }
        }

        checkDouble().then()
        return
      }
      setTimeout(() => roll(BLACK), 2000)
      return
    }
    
    if (remainingMoves.length < 1) return

    const available = getLegalMoves(BLACK, remainingMoves)
    if (available.length < 2) {
      if (available.length > 0) {
        const { from, roll } = available[0]
        applyMove(from, roll, BLACK)
        setTimeout(() => executeMove(roll), 1500)
      }

      return
    }
    
    const execute = async () => {
      setThinking(true)
      const moves = await provider.getMove({ dice, board, bar, remainingMoves })
      setThinking(false)

      for (let { from, to } of moves) {
        const roll = moveToRoll(from, to)
        if (from > 24) from = -1

        console.log("roll", roll, "from", from, "to", to)
        applyMove(from, roll, BLACK)
        executeMove(roll)
        await new Promise(resolve => setTimeout(resolve, 1500))
      }
    }
    
    const timer = setTimeout(execute, 1500)
    return () => clearTimeout(timer)
  }, [ai, provider, currentPlayer, phase, dice, remainingMoves, showDouble])

  React.useEffect(() => {
    if (phase !== PHASE.PLAYING || !currentPlayer) return

    if (bearOff[BLACK] === 15 || bearOff[WHITE] === 15) return

    if (dice.length === 0 && bar[currentPlayer] > 0) {
      setMessage(formatMsg(MSG.ON_BAR, { player: ucFirst(currentPlayer) }))
      return
    }

    if (dice.length > 0) {
      const available = getLegalMoves(currentPlayer, remainingMoves)
      setLegal(available)

      if (!available.length) {
        if (remainingMoves.length < dice.length && bar[currentPlayer] < 1) {
          switchPlayer().then()
        } else {
          setMessage(formatMsg(MSG.NO_LEGAL_MOVES, {
            player: ucFirst(currentPlayer),
            nextPlayer: ucFirst(getOpponent(currentPlayer))
          }))
          setTimeout(() => {
            switchPlayer().then()
          }, 2000)
        }
        return
      }

      setMessage(MSG.EMPTY)

      if (dice[0] === dice[1]) {
        // Just rolled a double
        setMessage(formatMsg(MSG.DOUBLE, { player: ucFirst(currentPlayer) }))
      }
    } else {
      setLegal([])
    }
  }, [phase, currentPlayer, dice, remainingMoves, getLegalMoves, switchPlayer, bearOff, bar])

  React.useEffect(() => {
    if (bearOff[currentPlayer] === 15) {
      console.log("GAME OVER")
      let msg = `${ucFirst(currentPlayer)} wins!`
      const earned = updatePoints(currentPlayer)
      if (earned > 1) {
        const label = earned > 2 ? BACKGAMMON : GAMMON
        msg = `${msg} - ${label}!`
      }
      setMessage(msg)
      
      setTimeout(() => {
        resetBoard()
      }, 2000)
    }
  }, [bearOff, currentPlayer])

  React.useEffect(() => {
    const a = points[WHITE]
    const b = points[BLACK]
    const winner = a > 4 ? WHITE : BLACK
    if (a > 4 || b > 4) {
      setMessage(formatMsg(MSG.WINNER, { player: ucFirst(winner) }))
      endGame()
    }
  }, [points])

  React.useEffect(() => {
    if (!showDouble || !ai) return
    if (currentPlayer === BLACK) return  // AI is offering, not responding

    // AI needs to respond to the player's double offer
    setThinking(true)
    const respond = async () => {
      const shouldAccept = await provider.shouldAcceptDouble({ board, bar })
      if (shouldAccept) {
        await handleAccept()
      } else {
        handleDecline()
      }
      setThinking(false)
    }

    setTimeout(respond, 1500)  // Brief delay so player sees the offer
  }, [showDouble, ai, currentPlayer])

  const findDestination = (dropX, dropY) => {
    // Check bear-off first
    const bx = places[0]
    if (bx !== undefined && dropX >= bx) {
      const bearOffDest = validDestinations.find(d => d < 1 || d > 24)
      return bearOffDest !== undefined ? bearOffDest : null
    }

    const isTop = dropY < topHalf
    const matches = validDestinations.filter(dest => isTop === dest < 13)

    for (const dest of matches) {
      const x = places[dest]
      if (x === undefined) continue

      const leftBound = x
      const rightBound = x + 55

      if (dropX >= leftBound && dropX <= rightBound) {
        return dest
      }
    }

    return null
  }

  const handleAccept = async () => {
    const newStake = acceptDouble()
    await saveGame()
    setShowDouble(false)
    setMessage(formatMsg(MSG.ACCEPTED, { stake: newStake }))
  }

  const handleDecline = () => {
    console.log("GAME OVER - FORFEIT")
    const earned = updatePoints(currentPlayer)
    setMessage(formatMsg(MSG.DECLINED, { player: ucFirst(currentPlayer), points: earned }))
    setShowDouble(false)

    setTimeout(() => {
      resetBoard()
    }, 2000)
  }

  const handleDragEnd = () => {
    setDragging(null)
    setValidDestinations([])
  }

  const handleDragStart = (from) => {
    setDragging(from)

    const destinations = legal
      .filter(m => m.from === from)
      .map(m => getDestination(from, m.roll, currentPlayer))
    setValidDestinations(destinations)
  }

  const handleDrop = (from, absoluteX, absoluteY) => {
    const destPoint = findDestination(absoluteX, absoluteY)
    if (destPoint === null) return

    const validMove = legal.find(m =>
      m.from === from &&
      getDestination(from, m.roll, currentPlayer) === destPoint
    )

    if (validMove) {
      const wasHit = applyMove(from, validMove.roll, currentPlayer)
      if (wasHit) {
        console.log('HIT!')
        // Add hit sound/visual feedback here
      }
      executeMove(validMove.roll)
    }
  }

  const handleExit = async () => {
    if (phase === PHASE.FINISHED) {
      await clearSavedGame()
    } else {
      await saveGame()
    }

    onEndGame()
  }

  const handleRoll = () => {
    if (isAiTurn) return

    roll(currentPlayer)
  }

  const isOpening = () => phase === PHASE.OPENING

  const renderBar = () => {
    const blackPieces = Array(bar[BLACK]).fill(BLACK)
    const whitePieces = Array(bar[WHITE]).fill(WHITE)
    const allPieces = [...blackPieces, ...whitePieces]

    if (allPieces.length === 0) return null

    const canMoveFromBar = legal.some(m => m.from < 0)

    return (
      <View style={styles.barOverlay}>
        <View style={styles.barPieces}>
          {allPieces.map((color, i) => {
            const isCurrentPlayer = color === currentPlayer
            const isTopBlack = color === BLACK && i === 0
            const isTopWhite = color === WHITE && i === bar[BLACK]
            const isTopOfColor = isTopBlack || isTopWhite
            const canMove = isTopOfColor && isCurrentPlayer && canMoveFromBar && !isAiTurn

            if (canMove) {
              return (
                <View key={i} style={styles.barPieceHighlight}>
                  <DraggablePiece
                    color={color}
                    from={-1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDrop={handleDrop}
                  />
                </View>
              )
            }

            return <Piece key={i} color={color} />
          })}
        </View>
      </View>
    )
  }

  const renderBearOff = () => {
    const dest = validDestinations.some(d => d < 1 || d > 24) ? styles.highlight : null

    return <View style={[styles.bearOffOverlay, dest]}>
      <View style={CS.gap1}>
        {Array(bearOff[BLACK]).fill(null).map((_, i) => <SidePiece key={i} color={BLACK} />)}
      </View>

      <View style={CS.gap1}>
        {Array(bearOff[WHITE]).fill(null).map((_, i) => <SidePiece key={i} color={WHITE} />)}
      </View>
    </View>
  }

  const renderBoard = () => (
    <View>
      <View style={styles.board}>
        <View style={[styles.frame, styles.flex]}>
          <View style={styles.frameTop}>{renderPositions(12, 7)}</View>
          <View style={styles.frameBottom}>{renderPositions(13, 18)}</View>
        </View>
        {renderBar()}
        <View style={[styles.frame, styles.flex]}>
          <View style={styles.frameTop}>{renderPositions(6, 1)}</View>
          <View style={styles.frameBottom}>{renderPositions(19, 24)}</View>
        </View>
      </View>
    </View>
  )

  const renderControls = () => {
    if (!currentPlayer) return null

    return (
      <View style={styles.controls}>
        <View style={styles.messageWrapper}>
          <Text style={[styles.text, phase === PHASE.FINISHED ? styles.buttonText : styles.message]}>{message}</Text>
        </View>

        <View style={[CS.rowGap]}>{renderDiceArea()}</View>

        <View style={[CS.gap, CS.centre]}>
          <Scoreboard points={points} red />
          <ExitButton onEndGame={handleExit} />
        </View>
      </View>
    )
  }
  
  const renderDiceArea = () => {
    if (phase === PHASE.FINISHED) return null

    if (resolving) {
      return (
        <>
          <AnimatedDice color={currentPlayer} audio={audio} />
          <AnimatedDice color={currentPlayer} audio={audio} />
        </>
      );
    }

    if (showDouble) {
      if (ai && currentPlayer === WHITE) return null

      return (
        <Offer
          onAccept={handleAccept}
          onDecline={handleDecline}
          from={currentPlayer}
        />
      );
    }

    if (dice.length > 0) {
      const inverted = currentPlayer === BLACK;

      if (dice[0] === dice[1]) {
        const usedCount = 4 - remainingMoves.length;
        return (
          <>
            <Dice value={dice[0]} inverted={inverted} used={usedCount > 0} />
            <Dice value={dice[0]} inverted={inverted} used={usedCount > 1} />
            <Dice value={dice[0]} inverted={inverted} used={usedCount > 2} />
            <Dice value={dice[0]} inverted={inverted} used={usedCount > 3} />
          </>
        );
      }

      const usedDice = dice.filter(d => !remainingMoves.includes(d));
      return (
        <>
          <Dice
            value={dice[0]}
            inverted={inverted}
            used={usedDice.includes(dice[0])}
          />
          <Dice
            value={dice[1]}
            inverted={inverted}
            used={usedDice.includes(dice[1])}
          />
        </>
      );
    }

    return (
      <View style={CS.gap}>
        <RollButton
          currentPlayer={currentPlayer}
          onPress={handleRoll}
          disabled={ai && currentPlayer === BLACK}
        />
        {canDouble() && !isAiTurn && <DoublingButton onPress={showDoubling} />}
      </View>
    );
  }

  const renderGutter = () => (
    <View
      style={styles.gutter}
      ref={(viewRef) => {
        if (places[0]) return

        if (viewRef) {
          setTimeout(() => {
            if (viewRef) {  // Check again inside setTimeout
              viewRef.measure((x, y, width, height, pageX) => {
                setPlaces(prev => ({
                  ...prev,
                  0: pageX,
                  25: pageX
                }))
              })
            }
          }, 2)
        }
      }}
    >
        <View style={[styles.frame, styles.sideFrame]} />
        <View style={[styles.frame, styles.sideFrame, styles.cubeFrame]}>
          <Cube value={stake} owner={hasCube} />
        </View>
        <View style={[styles.frame, styles.sideFrame]} />
        {renderBearOff()}
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
              ? <AnimatedDice color={WHITE} audio={audio} />
              : <RollButton player={WHITE} onPress={() => roll(WHITE)} />
          )}
        </View>

        <View style={styles.rollSection}>
          {blackRoll > 0 && <Dice value={blackRoll} inverted />}
          {blackRoll === 0 && (
            resolving === BLACK
              ? <AnimatedDice color={BLACK} audio={audio} />
              : <RollButton
                player={BLACK}
                disabled={ai}
                onPress={() => {if (!ai) roll(BLACK)}}
              />
          )}
        </View>
      </View>
      <ExitButton onEndGame={onEndGame} />
    </View>
  )

  const renderPositions = (start, end) => {
    const rotation = start < 13 ? 180 : 0
    const ascending = end > start
    const positions = ascending
     ? board.slice(start, end + 1)
     : board.slice(end, start + 1).reverse()
    const validFrom = [...new Set(legal.map(m => m.from))]

    return (
      <View style={[CS.row, CS.wrap]}>
        {
          positions.map((point, idx) => {
            const fill = idx % 2 === 0 ? COLOURS.beige : COLOURS.darkGrey
            const position = ascending ? start + idx : start - idx
            const canMoveFrom = validFrom.includes(position)
            const canMoveTo = validDestinations.includes(position)
            const stacked = [styles.tile]
            const extra = Math.max(point.count - 5, 0)
            if (extra) {
              stacked.push(rotation === 180 ? { marginBottom: -2 * extra } : { marginTop: -2 * extra })
            }

            return (
              <View
                key={idx}
                ref={(viewRef) => {
                  if (places[position]) return

                  if (viewRef) {
                    setTimeout(() => {
                      viewRef.measure((x, y, width, height, pageX) => {
                        setPlaces(prev => ({ ...prev, [position]: pageX }))
                      })
                    }, 2)
                  }
                }}
              >
                <View style={{ transform: [{ rotate: `${rotation}deg` }] }}>
                  <Triangle fill={fill} source={canMoveFrom && !dragging} dest={canMoveTo} />
                </View>
                
                {
                  point.count > 0 && (
                    <View style={[styles.tiles, rotation === 180 ? CS.top : CS.bottom]}>
                      {
                      Array(point.count).fill(undefined).map((_, i) => {
                        const isTopPiece = rotation === 180 ? i === point.count - 1 : i === 0
                        
                        if (isTopPiece && canMoveFrom && !isAiTurn) {
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
                          <View key={i} style={stacked}>
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

  const showDoubling = () => {
    setMessage(MSG.EMPTY)
    setShowDouble(true)
  };

  return (
    <View style={[styles.container, isOpening() ? CS.bgBlue : null, safeArea]}>
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
      { thinking && <ThinkingIndicator />}
    </View>
  )
}

export default GameScreen