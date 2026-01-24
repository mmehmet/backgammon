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
  controls: { backgroundColor: COLOURS.black, flex: 1, alignItems: "center" },
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
    backgroundColor: COLOURS.darkBlue,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
  },
  text: {
    fontSize: 18,
    color: COLOURS.lightGrey,
    lineHeight: 24,
  },
  tile: { position: 'absolute', width: '100%', alignItems: 'center' },
})

export default styles