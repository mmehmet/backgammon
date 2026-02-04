import { Pressable, Text } from 'react-native'

import styles from '../styles/GameStyles'

export const DoublingButton = ({ onPress }) => {
  return (
    <Pressable style={styles.buttonDoubling} onPress={onPress}>
      <Text style={styles.buttonText}>x2</Text>
    </Pressable>
  )
}