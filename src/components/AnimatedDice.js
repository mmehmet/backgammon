import { Animated } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import Sound from 'react-native-sound'
import { Dice } from './Dice'
import { BLACK } from '../utils/constants'

Sound.setCategory('Playback')

export const AnimatedDice = ({ color }) => {
  const [displayValue, setDisplayValue] = useState(1)
  const rotateAnim = useRef(new Animated.Value(0)).current
  const cycleInterval = useRef(null)

  useEffect(() => {
    const sound = new Sound('dice_roll.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error)
        return
      }
      sound.play((success) => {
        if (!success) console.log('Sound playback failed')
        sound.release()
      })
    })

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ).start()

    cycleInterval.current = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 6) + 1)
    }, 50)

    return () => {
      clearInterval(cycleInterval.current)
    }
  }, [rotateAnim])

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