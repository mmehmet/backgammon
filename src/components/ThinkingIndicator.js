import React from 'react'
import { Animated } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons"

import { COLOURS } from '../utils/colours'
import styles from "../styles/GameStyles"

export const ThinkingIndicator = () => {
  const opacity = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start()
  }, [])

  return (
    <Animated.View style={[styles.thinking, { opacity }]}>
      <Icon name="psychology" size={48} color={COLOURS.red} />
    </Animated.View>
  )
}