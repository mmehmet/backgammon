import { StyleSheet } from 'react-native'
import { COLOURS } from '../utils/colours'

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        backgroundColor: COLOURS.white,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: COLOURS.darkGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLOURS.black,
        marginHorizontal: 2,
    },
    row: {
        flexDirection: 'row',
        gap: 4,
        paddingHorizontal: 8,
    },
    column: {
        justifyContent: 'space-around',
        height: '100%',
        paddingVertical: 6,
    },
    left: { alignSelf: "flex-start" },
    center: { alignSelf: "center" },
    right: { alignSelf: "flex-end" },
})

export default styles