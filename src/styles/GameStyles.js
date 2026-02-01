import { StyleSheet } from 'react-native'
import { COLOURS } from '../utils/colours'
import { diameter } from '../components/Piece'

const gutterWdith = diameter + 16 + 2 // two 8px borders and a 1px padding

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOURS.black, padding: 16 },
  board: {
    flex: 1,
    gap: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: COLOURS.darkBrown,
  },
  controls: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  gutter: { width: gutterWdith, gap: 1 },
  cubeFrame: { maxHeight: gutterWdith },
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
    borderWidth: 1.5,
    borderColor: COLOURS.white,
  },
  buttonRed: { borderWidth: 0, backgroundColor: COLOURS.red },
  text: { fontSize: 18, color: COLOURS.lightGrey, lineHeight: 24 },
  message: { fontSize: 14, color: COLOURS.lightGrey, lineHeight: 18 },
  tiles: { position: 'absolute', width: '100%', alignItems: 'center' },
  tile: { marginBottom: -1, marginTop: -1 },
  rollSection: { padding: 8, flex: 1, alignItems: 'center', justifyContent: "center" },
  barOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  rollSection: { padding: 8, flex: 1, alignItems: 'center', justifyContent: "center" },
  bearOffOverlay: {
    position: 'absolute',
    top: 9,
    bottom: 9,
    right: 9,
    width: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  barPieces: { alignItems: "center", gap: -10 },
  bearOffPieces: { gap: 1 },
  highlight: { backgroundColor: COLOURS.green },
})

export default styles