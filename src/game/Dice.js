import { View } from 'react-native'
import styles from '../styles/DiceStyles'

export const Dice = ({ value }) => {
    const renderDots = () => {
        switch (value) {
            case 1:
                return <View style={styles.dot} />

            case 2:
                return (
                    <View style={styles.column}>
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                )

            case 3:
                return (
                    <View style={styles.column}>
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                )

            case 4:
                return (
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                        <View style={styles.row}>
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                    </View>
                )

            case 5:
                return (
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                        <View style={styles.dot} />
                        <View style={styles.row}>
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                    </View>
                )

            case 6:
                return (
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                        <View style={styles.row}>
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                        <View style={styles.row}>
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                    </View>
                )

            default:
                return null
        }
    }

    return (
        <View style={styles.container}>
            {renderDots()}
        </View>
    )
}