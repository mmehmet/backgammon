import React from 'react'
import { View, Text, Pressable } from 'react-native'

import { Scoreboard } from "../components/Scoreboard"
import Settings from '../components/Settings'
import { useGameStore } from '../components/State'
import CS from '../styles/CommonStyles'
import styles from '../styles/StartScreenStyles'
import { BLACK, WHITE } from "../utils/constants"

const StartScreen = ({ onStart, onContinue }) => {
  const [hasSave, setHasSave] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)
  const { hasSavedGame, points } = useGameStore()

  React.useEffect(() => {
    hasSavedGame().then(setHasSave)
  }, [])

  const handleNewGame = () => setShowSettings(true)

  const handleSubmitSettings = (settings) => onStart(settings)

  return (
    <View style={[CS.container, styles.bg]}>
      <Text style={styles.title}>Backgammon</Text>
      
      {showSettings ? (
        <Settings onSubmit={handleSubmitSettings} />
      ) : (
      <View style={CS.gap}>
          <Pressable style={CS.button} onPress={handleNewGame}>
          <Text style={CS.buttonText}>New Game</Text>
        </Pressable>

        {hasSave && (
          <Pressable style={[CS.button, CS.bgGrey]} onPress={onContinue}>
            <Text style={[CS.buttonText, CS.buttonTextDark]}>Continue Game</Text>
          </Pressable>
        )}
      </View>
      )}

      {(points[BLACK] || points[WHITE]) && (
        <View>
          <Scoreboard points={points} />
        </View>
      )}
    </View>
  )
}

export default StartScreen