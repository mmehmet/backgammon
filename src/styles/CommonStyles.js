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
  wrap: { flexWrap: "wrap"},
  button: {
    backgroundColor: COLOURS.red,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 24,
    fontWeight: 'bold'
  },
})

export default CS