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
  label: {
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: 900,
    lineHeight: 24,
  },
  toggle: {
    flex: 1,
    backgroundColor: COLOURS.disabled,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4
  },
  toggleActive: { backgroundColor: COLOURS.red },
  toggleText: { color: COLOURS.darkGrey, fontSize: 16, fontWeight: 600 },
  toggleTextActive: { color: COLOURS.white },
})

export default styles