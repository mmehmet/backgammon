import React from 'react'
import { View, Text, Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import CS from '../styles/CommonStyles'
import styles from '../styles/StartScreenStyles'
import Toggle from './Toggle'
import { LEVELS } from '../utils/constants'

// slider thumb width
const FULL = 40
const HALF = 20
const levels = [LEVELS.EASY, LEVELS.MEDIUM, LEVELS.HARD]

const Settings = ({ onSubmit }) => {
  const [ai, setAi] = React.useState(false)
  const [difficulty, setDifficulty] = React.useState(LEVELS.EASY)
  const [audio, setAudio] = React.useState(true)

  const trackWidth = useSharedValue(0)
  const translateX = useSharedValue(0)
  const startX = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))

  const getPosition = (level) => {
    if (trackWidth.value === 0) return 0
    if (level === LEVELS.EASY) return 0
    if (level === LEVELS.MEDIUM) return trackWidth.value / 2 - HALF
    return trackWidth.value - FULL
  }

  React.useEffect(() => {
    if (trackWidth.value > 0) {
      translateX.value = getPosition(difficulty)
    }
  }, [difficulty])

  const gesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value
    })
    .onUpdate((event) => {
      translateX.value = Math.max(0, Math.min(trackWidth.value, startX.value + event.translationX))
    })
    .onEnd(() => {
      const pos = translateX.value
      const positionRatio = pos / (trackWidth.value - FULL)
      const index = Math.min(2, Math.max(0, Math.round(positionRatio * 2)))

      const positions = [0, (trackWidth.value / 2) - HALF, trackWidth.value - FULL]

      translateX.value = withSpring(positions[index])
      runOnJS(setDifficulty)(levels[index])
    })

  const handleAudio = () => setAudio(!audio)

  const handlePlayers = () => setAi(!ai)

  const handleSubmit = () => onSubmit({ ai, difficulty, audio })

  const renderDifficulty = () => {
    return (
      <View style={[CS.gap, !ai && { opacity: 0 }]} pointerEvents={ai ? 'auto' : 'none'}>
        <Text style={styles.label}>AI Opponent Difficulty</Text>
        <View
          style={styles.sliderContainer}
          onLayout={(e) => { trackWidth.value = e.nativeEvent.layout.width }}
        >
          <View style={styles.sliderTrack} />
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.sliderThumb, animatedStyle]} />
          </GestureDetector>
        </View>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>Easy</Text>
          <Text style={styles.sliderLabel}>Medium</Text>
          <Text style={styles.sliderLabel}>Hard</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.gap}>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text style={styles.label}>Audio</Text>
          <Toggle value={audio} onToggle={handleAudio} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>AI Opponent</Text>
          <Toggle value={ai} onToggle={handlePlayers} />
        </View>
      </View>

      {renderDifficulty()}

      <Pressable style={CS.button} onPress={handleSubmit}>
        <Text style={CS.buttonText}>Start Game</Text>
      </Pressable>
    </View>
  )
}

export default Settings