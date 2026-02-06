import React from 'react'
import { View, Text, Pressable } from 'react-native'

import CS from '../styles/CommonStyles'
import styles from '../styles/StartScreenStyles'
import { LEVELS } from '../utils/constants'

const Settings = ({ onSubmit }) => {
  const [players, setPlayers] = React.useState(2)
  const [difficulty, setDifficulty] = React.useState(LEVELS.EASY)
  const [audio, setAudio] = React.useState(true)

  const handleSubmit = () => onSubmit({ ai: (players === 1), difficulty, audio })

  return (
    <View style={CS.gap}>
      <View style={CS.gap}>
        <Text style={styles.label}>Players</Text>
        <View style={CS.row}>
          <Pressable
            style={[styles.toggle, players === 2 && styles.toggleActive]}
            onPress={() => setPlayers(2)}
          >
            <Text style={[styles.toggleText, players === 2 && styles.toggleTextActive]}>2 Players</Text>
          </Pressable>
          <Pressable
            style={[styles.toggle, players === 1 && styles.toggleActive]}
            onPress={() => setPlayers(1)}
          >
            <Text style={[styles.toggleText, players === 1 && styles.toggleTextActive]}>vs AI</Text>
          </Pressable>
        </View>
      </View>

      {players === 1 && (
        <View style={CS.gap}>
          <Text style={styles.label}>Difficulty</Text>
          <View style={CS.row}>
            <Pressable
              style={[styles.toggle, difficulty === LEVELS.EASY && styles.toggleActive]}
              onPress={() => setDifficulty(LEVELS.EASY)}
            >
              <Text style={[styles.toggleText, difficulty === LEVELS.EASY && styles.toggleTextActive]}>Easy</Text>
            </Pressable>
            <Pressable
              style={[styles.toggle, difficulty === LEVELS.MEDIUM && styles.toggleActive]}
              onPress={() => setDifficulty(LEVELS.MEDIUM)}
            >
              <Text style={[styles.toggleText, difficulty === LEVELS.MEDIUM && styles.toggleTextActive]}>Medium</Text>
            </Pressable>
            <Pressable
              style={[styles.toggle, difficulty === LEVELS.HARD && styles.toggleActive]}
              onPress={() => setDifficulty(LEVELS.HARD)}
            >
              <Text style={[styles.toggleText, difficulty === LEVELS.HARD && styles.toggleTextActive]}>Hard</Text>
            </Pressable>
          </View>
        </View>
      )}

      <View style={CS.gap}>
        <Text style={styles.label}>Audio</Text>
        <View style={CS.row}>
          <Pressable
            style={[styles.toggle, audio && styles.toggleActive]}
            onPress={() => setAudio(true)}
          >
            <Text style={[styles.toggleText, audio && styles.toggleTextActive]}>On</Text>
          </Pressable>
          <Pressable
            style={[styles.toggle, !audio && styles.toggleActive]}
            onPress={() => setAudio(false)}
          >
            <Text style={[styles.toggleText, !audio && styles.toggleTextActive]}>Off</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={CS.button} onPress={handleSubmit}>
        <Text style={CS.buttonText}>Start Game</Text>
      </Pressable>
    </View>
  )
}

export default Settings