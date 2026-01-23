import React from 'react'
import { View, Text, Pressable } from 'react-native'

import CS from "../styles/CommonStyles"
import styles from "../styles/GameStyles"

const GameScreen = ({ onEndGame }) => {
  return (
    <View style={[CS.container, styles.bg]}>
      <Text style={styles.text}>Board will go here</Text>
      <Pressable style={CS.button} onPress={onEndGame}>
        <Text style={CS.buttonText}>Quit Game</Text>
      </Pressable>
    </View>
  )
}

export default GameScreen