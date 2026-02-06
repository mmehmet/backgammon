import { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import Sound from 'react-native-sound'

import { Dice } from './Dice'
import { BLACK } from '../utils/constants'

Sound.setCategory('Playback')

const MP3 = 'dice_roll.mp3'

export const AnimatedDice = ({ color, audio }) => {
  const [displayValue, setDisplayValue] = useState(1)
  const rotateAnim = useRef(new Animated.Value(0)).current
  const cycleInterval = useRef(null)

  useEffect(() => {
    if (audio) {
      const sound = new Sound(MP3, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load sound', error)
          return
        }

        sound.play((success) => {
          if (!success) console.log('Sound playback failed')
          sound.release()
        })
      })
    }

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
  }, [rotateAnim, audio])

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