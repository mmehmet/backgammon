import React from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import { Piece } from './Piece'

export const DraggablePiece = ({ color, from, onDragStart, onDragEnd, onDrop }) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const pan = Gesture.Pan()
    .onBegin(() => {
      runOnJS(onDragStart)(from)
    })
    .onUpdate((e) => {
      translateX.value = e.translationX
      translateY.value = e.translationY
    })
    .onEnd((e) => {
      if (onDrop) {
        runOnJS(onDrop)(from, e.absoluteX, e.absoluteY)
      }
      runOnJS(onDragEnd)()
      translateX.value = withSpring(0)
      translateY.value = withSpring(0)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    zIndex: 1000,
    elevation: 10,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value }
    ]
  }))

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={animatedStyle}>
        <Piece color={color} />
      </Animated.View>
    </GestureDetector>
  )
}