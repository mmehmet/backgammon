import React, { useState } from 'react'
import { View } from 'react-native'
import StartScreen from './src/screens/StartScreen'
import GameScreen from './src/screens/GameScreen'
import { resetBoard } from './src/game/Board'
import { useGameStore } from './src/game/State'

const App = () => {
  const [gameActive, setGameActive] = useState(false)
  const resetState = useGameStore(state => state.resetState)

  const handleStartGame = () => {
    console.log('Game started')
    resetBoard()
    resetState()
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