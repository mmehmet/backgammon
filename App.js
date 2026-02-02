import React from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { useGameStore } from './src/components/State'
import GameScreen from './src/screens/GameScreen'
import StartScreen from './src/screens/StartScreen'
import CS from "./src/styles/CommonStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  const [gameActive, setGameActive] = React.useState(false)
  const { resetState, resetBoard, restoreGame } = useGameStore()

  const handleEndGame = () => {
    console.log('Game ended')
    setGameActive(false)
  }

  const handleStart = () => {
    console.log('New game started')
    resetBoard()
    resetState()
    setGameActive(true)
  }

  const handleContinue = async () => {
    console.log('Continuing game')
    const restored = await restoreGame()
    if (restored) {
      setGameActive(true)
    }
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={CS.flex}>
        {gameActive ? (
          <GameScreen onEndGame={handleEndGame} />
        ) : (
          <StartScreen onStart={handleStart} onContinue={handleContinue} />
        )}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App