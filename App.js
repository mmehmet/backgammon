import React, { useState } from 'react'
import { View } from 'react-native'
import StartScreen from './src/screens/StartScreen'
import GameScreen from './src/screens/GameScreen'

const App = () => {
  const [gameActive, setGameActive] = useState(false)

  const handleStartGame = () => {
    console.log('Game started')
    setGameActive(true)
  }

  const handleEndGame = () => {
    console.log('Game ended')
    setGameActive(false)
  }

  return (
    <View style={{ flex: 1 }}>
      {gameActive ? (
        <GameScreen onEndGame={handleEndGame} />
      ) : (
        <StartScreen onStartGame={handleStartGame} />
      )}
    </View>
  )
}

export default App