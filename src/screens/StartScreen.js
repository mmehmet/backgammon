import React from 'react'
import { View, Text, Pressable } from 'react-native'

import CS from "../styles/CommonStyles"
import styles from "../styles/StartScreenStyles"

const StartScreen = ({ onStartGame }) => {
  return (
    <View style={[CS.container, styles.bg]}>
      <Text style={styles.title}>Backgammon</Text>
      <Pressable style={CS.button} onPress={onStartGame}>
        <Text style={CS.buttonText}>New Game</Text>
      </Pressable>
    </View>
  )
}

export default StartScreen