import { StyleSheet } from 'react-native'
import { COLOURS } from '../utils/colours'

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOURS.black, padding: 24 },
  board: {
    flex: 1,
    gap: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: COLOURS.darkBrown,
  },
  controls: {
    flex: 1,
    backgroundColor: COLOURS.black,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  gutter: { width: 40, gap: 1 },
  cubeFrame: { maxHeight: 40 },
  frame: {
    borderWidth: 14,
    borderColor: COLOURS.mediumBrown,
    backgroundColor: COLOURS.sienna,
   },
  sideFrame: { borderWidth: 8, flex: 1 },
  frameTop: { flex: 1, justifyContent: "flex-start" },
  frameBottom: { flex: 1, justifyContent: "flex-end" },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLOURS.white,
  },
  buttonRed: { borderWidth: 0, backgroundColor: COLOURS.red },
  text: { fontSize: 18, color: COLOURS.lightGrey, lineHeight: 24 },
  message: { fontSize: 14, color: COLOURS.lightGrey, lineHeight: 18 },
  tile: { position: 'absolute', width: '100%', alignItems: 'center' },
  rollSection: { padding: 8, flex: 1, alignItems: 'center', justifyContent: "center" },
})

export default styles