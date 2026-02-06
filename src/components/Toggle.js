import { Pressable, Text, View } from 'react-native'

import styles from '../styles/StartScreenStyles'

export const ON = 'On'
export const OFF = 'Off'

const Toggle = ({ value, onToggle, onLabel = ON, offLabel = OFF }) => (
  <Pressable
    style={[styles.toggle, value && styles.toggleActive]}
    onPress={onToggle}
  >
    {value ? (
      <>
        <Text style={[styles.toggleText, value && styles.toggleTextActive]}>{onLabel}</Text>
        <View style={styles.toggleCircle} />
      </>
    ) : (
      <>
        <View style={styles.toggleCircle} />
        <Text style={[styles.toggleText, value && styles.toggleTextActive]}>{offLabel}</Text>
      </>
    )}
  </Pressable>
)

export default Toggle