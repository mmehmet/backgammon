import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
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
    <SafeAreaProvider>
      {gameActive ? (
        <GameScreen onEndGame={handleEndGame} />
      ) : (
        <StartScreen onStartGame={handleStartGame} />
      )}
    </SafeAreaProvider>
  )
}

export default App