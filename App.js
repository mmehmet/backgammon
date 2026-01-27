import React, { useState } from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { useGameStore } from './src/components/State'
import GameScreen from './src/screens/GameScreen'
import StartScreen from './src/screens/StartScreen'
import CS from "./src/styles/CommonStyles";

const App = () => {
  const [gameActive, setGameActive] = useState(false)
  const { resetState, resetBoard } = useGameStore();

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
    <GestureHandlerRootView style={CS.flex}>
      {gameActive ? (
        <GameScreen onEndGame={handleEndGame} />
      ) : (
        <StartScreen onStartGame={handleStartGame} />
      )}
    </GestureHandlerRootView>
  )
}

export default App