import { StyleSheet } from 'react-native'
import { COLOURS } from '../utils/colours'

const CS = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centre: { alignItems: "center", justifyContent: "center" },
  align: { alignItems: "center" },
  row: { flexDirection: "row" },
  rowGap: { flexDirection: 'row', gap: 8 },
  flex: { flex: 1 },
  gap: { gap: 8 },
  gap1: { gap: 1 },
  wrap: { flexWrap: "wrap"},
  top: { top: 0 },
  bottom: { bottom: 0 },
  half: { width: "50%" },
  button: {
    backgroundColor: COLOURS.red,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  scores: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  black: { color: COLOURS.black },
  red: { color: COLOURS.red },
  bgBlack: { backgroundColor: COLOURS.black },
  bgBlue: { backgroundColor: COLOURS.darkBlue },
  bgWhite: { backgroundColor: COLOURS.offWhite },
  bgGrey: { backgroundColor: COLOURS.disabled },
  bgRed: { backgroundColor: COLOURS.darkRed },
  buttonText: {
    color: COLOURS.white,
    fontSize: 24,
    fontWeight: 900,
    lineHeight: 24,
  },
  buttonTextDark: { color: COLOURS.darkGrey },
  buttonTextRegular: { fontWeight: 400 },
})

export default CS