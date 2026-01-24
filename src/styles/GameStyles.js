import { StyleSheet } from 'react-native'
import { COLOURS } from '../utils/colours'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.darkBrown, 
    padding: 24,
  },
  board: { flex: 1, gap: 2, flexDirection: "row", justifyContent: "center" },
  gutter: { width: 64 },
  cubeFrame: { maxHeight: 64 },
  frame: {
    borderWidth: 18,
    borderColor: COLOURS.mediumBrown,
    backgroundColor: COLOURS.sienna,
   },
  sideFrame: { borderWidth: 10, flex: 1 },
  frameTop: { flex: 1, justifyContent: "flex-start" },
  frameBottom: { flex: 1, justifyContent: "flex-end" },
  text: {
    fontSize: 18,
    color: COLOURS.lightGrey,
    lineHeight: 24,
  },
})

export default styles