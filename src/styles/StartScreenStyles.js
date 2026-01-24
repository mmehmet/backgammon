import { StyleSheet } from 'react-native'
import { COLOURS } from '../utils/colours'

const styles = StyleSheet.create({
  bg: { backgroundColor: COLOURS.darkBlue },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLOURS.white,
    marginBottom: 32
  },
})

export default styles