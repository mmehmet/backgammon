import { Animated } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { Dice } from './Dice'
import { BLACK } from '../utils/constants'

export const AnimatedDice = ({ color }) => {
  const [displayValue, setDisplayValue] = useState(1)
  const rotateAnim = useRef(new Animated.Value(0)).current
  const cycleInterval = useRef(null)

  useEffect(() => {
    // Start rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ).start()

    // Cycle through random values
    cycleInterval.current = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 6) + 1)
    }, 50)

    return () => {
      clearInterval(cycleInterval.current)
    }
  }, [])

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Dice value={displayValue} inverted={color === BLACK} />
    </Animated.View>
  )
}