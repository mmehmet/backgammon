import { StyleSheet } from 'react-native'
import { COLOURS } from '../utils/colours'

const CS = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  align: { alignItems: "center" },
  row: { flexDirection: "row" },
  flex: { flex: 1 },
  gap: { gap: 8 },
  wrap: { flexWrap: "wrap"},
  button: {
    backgroundColor: COLOURS.red,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10
  },
  bgBlack: { backgroundColor: COLOURS.black },
  bgBlue: { backgroundColor: COLOURS.darkBlue },
  bgWhite: { backgroundColor: COLOURS.offWhite },
  buttonText: {
    color: COLOURS.white,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  buttonTextDark: { color: COLOURS.offBlack },
  buttonTextRegular: { fontWeight: 400 },
})

export default CS