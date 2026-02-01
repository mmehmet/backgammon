import React from 'react'
import { View, Text, Pressable } from 'react-native'

import { useGameStore } from '../components/State'
import CS from '../styles/CommonStyles'
import styles from '../styles/StartScreenStyles'

const StartScreen = ({ onStart, onContinue }) => {
  const [hasSave, setHasSave] = React.useState(false)
  const { hasSavedGame } = useGameStore()

  React.useEffect(() => {
    hasSavedGame().then(setHasSave)
  }, [])

  return (
    <View style={[CS.container, styles.bg]}>
      <Text style={styles.title}>Backgammon</Text>
      <View style={CS.gap}>
        <Pressable style={CS.button} onPress={onStart}>
          <Text style={CS.buttonText}>New Game</Text>
        </Pressable>

        {hasSave && (
          <Pressable style={[CS.button, CS.bgGrey]} onPress={onContinue}>
            <Text style={[CS.buttonText, CS.buttonTextDark]}>Continue Game</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}

export default StartScreen