import { View, Text } from 'react-native'

import CS from '../styles/CommonStyles'
import styles from '../styles/GameStyles'
import { WHITE } from '../utils/constants'

export const Cube = ({ value, owner }) => {
  if (value === 1) return null

  const isWhite = owner === WHITE
  const bg = isWhite
    ? styles.buttonWhite
    : styles.buttonBlack

  return (
    <View style={[styles.cube, bg]}>
      <Text style={[styles.buttonText, CS.red]}>{value}</Text>
    </View>
  )
}