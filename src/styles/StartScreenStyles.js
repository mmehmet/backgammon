import { StyleSheet } from 'react-native'
import { COLOURS } from '../utils/colours'

const styles = StyleSheet.create({
  bg: { backgroundColor: COLOURS.darkBlue },
  gap: { gap: 24 },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLOURS.white,
    marginBottom: 32
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, justifyContent: 'space-between' },
  label: {
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: 900,
    lineHeight: 24,
  },
  toggle: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOURS.darkGrey,
    padding: 4,
    paddingRight: 16,
    borderRadius: 50,
  },
  toggleCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLOURS.white,
  },
  toggleActive: { backgroundColor: COLOURS.toggleGreen, paddingLeft: 16, paddingRight: 4 },
  toggleText: { color: COLOURS.disabled, fontSize: 24, lineHeight: 24, fontWeight: 700 },
  toggleTextActive: { color: COLOURS.darkGrey },
  sliderContainer: {
    height: 20,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: COLOURS.mediumGrey,
    borderRadius: 2,
    zIndex: 1,
  },
  sliderThumb: {
    width: 40,
    height: 20,
    borderRadius: 20,
    backgroundColor: COLOURS.lightGrey,
    position: 'absolute',
    zIndex: 3,
  },
  sliderZone: { paddingTop: 30, zIndex: 2, marginTop: -30 },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    color: COLOURS.white,
    fontSize: 14,
    fontWeight: 600,
    paddingHorizontal: 4,
  },
})

export default styles