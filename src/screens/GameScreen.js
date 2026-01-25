import React from 'react'
import { View, Pressable, Text } from 'react-native'
import { Svg, Polygon } from 'react-native-svg'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { AnimatedDice } from '../game/AnimatedDice'
import { board, resetBoard } from '../game/Board'
import { Dice } from '../game/Dice'
import { Piece } from '../game/Piece'
import { useGameStore } from '../game/State'
import CS from '../styles/CommonStyles'
import styles from '../styles/GameStyles'
import { COLOURS } from '../utils/colours'
import { PHASE, BLACK, WHITE } from '../utils/constants'
import { getRoll, ucFirst } from '../utils/helpers'

const GameScreen = ({ onEndGame }) => {
  const [message, setMessage] = React.useState('')
  const [resolving, setResolving] = React.useState(null)
  const [whiteRoll, setWhiteRoll] = React.useState(0)
  const [blackRoll, setBlackRoll] = React.useState(0)
  const { phase, startGame } = useGameStore()

  React.useEffect(() => {
    if (whiteRoll > 0 && blackRoll > 0) {
      const starter = determineStarter()
      if (starter) {
        setMessage(`${ucFirst(starter)} has the higher roll and will start...`)
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

  const renderControls = () => (
    <View style={styles.controls}>
      <View style={CS.wrap}>
        <ExitButton />
      </View>
    </View>
  )

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

      <View style={[CS.row]}>
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

    return (
      <View style={[CS.row, CS.wrap]}>
        {
          points.map((point, idx) => {
            const fill = idx % 2 === 0 ? COLOURS.beige : COLOURS.darkGrey

            return (
              <View key={idx}>
                <View style={{ transform: [{ rotate: `${rotation}deg` }] }}>
                  <Triangle fill={fill} />
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
      if (!player) {
        // Gameplay roll - two dice
        const die2 = getRoll()
        setDice(die1, die2)
      } else {
        // Opening roll - single die
        player === WHITE ? setWhiteRoll(die1) : setBlackRoll(die1)
      }
      console.log(player, die1)
      setResolving(null)
    }, 500 + Math.random() * 1000)
  }

  const RollButton = ({ player, onPress }) => {
    const isWhite = player === WHITE
    return (
      <Pressable style={[CS.button, isWhite ? CS.bgWhite : CS.bgBlack]} onPress={onPress}>
        <Text style={[CS.buttonText, isWhite && CS.buttonTextDark]}>Roll</Text>
      </Pressable>
    )
  }

  const Triangle = ({ fill, width = 40, height = 120 }) => {
    const points = `0,${height} ${width/2},0 ${width},${height}`

    return (
      <Svg width={width} height={height}>
        <Polygon points={points} fill={fill} />
      </Svg>
    )
  }

  resetBoard()
  console.log(phase)

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