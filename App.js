import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import StartScreen from './src/screens/StartScreen'

const App = () => {
  const handleStartGame = () => {
    console.log('Game started')
  }

  return (
    <SafeAreaProvider>
      <StartScreen onStartGame={handleStartGame} />
    </SafeAreaProvider>
  )
}

export default App