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
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 6,
    },
    column: {
        justifyContent: 'space-around',
        height: '100%',
        paddingVertical: 6,
    },
})

export default styles