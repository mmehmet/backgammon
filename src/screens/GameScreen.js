import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Svg, Polygon } from 'react-native-svg'

import { board, resetBoard } from '../game/Board'
import CS from '../styles/CommonStyles'
import styles from '../styles/GameStyles'
import { COLOURS } from '../utils/colours'

const GameScreen = ({ onEndGame }) => {
  resetBoard()

  const Triangle = ({ width, height, fill }) => {
    const points = `0,${height} ${width/2},0 ${width},${height}`
    return (
      <Svg width={width} height={height}>
        <Polygon points={points} fill={fill} />
      </Svg>
    )
  }

  const renderBoard = () => (
    <View style={CS.flex}>
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

  const renderGutter = () => (
    <View style={styles.gutter}>
        <View style={[styles.frame, styles.sideFrame]} />
        <View style={[styles.frame, styles.sideFrame, styles.cubeFrame]} />
        <View style={[styles.frame, styles.sideFrame]} />
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
              <View key={idx} style={{ transform: [{ rotate: `${rotation}deg` }] }}>
                <Triangle width={50} height={136} fill={fill} />
              </View>
            )
          })
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {renderGutter()}
        {renderBoard()}
        {renderGutter()}
      </View>
    </View>
  )
}

export default GameScreen