import { StyleSheet } from 'react-native'
import { COLOURS } from '../utils/colours'

const CS = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.background
  },
  button: {
    backgroundColor: COLOURS.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default CS