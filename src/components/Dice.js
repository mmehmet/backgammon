import { View } from 'react-native'
import CS from '../styles/CommonStyles'
import styles from '../styles/DiceStyles'

export const Dice = ({ value, inverted = false, used = false }) => {
  const dotStyle = [styles.dot, inverted ? CS.bgWhite : CS.bgBlack]
  const blank = [styles.dot, { backgroundColor: "transparent" }]
  const dim = used && { opacity: 0.5 }

  const renderDots = () => {
    switch (value) {
      case 1:
        return <View style={dotStyle} />

      case 2:
        return (
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={dotStyle} />
              <View style={blank} />
            </View>
            <View style={styles.row}>
              <View style={blank} />
              <View style={dotStyle} />
            </View>
          </View>
        )

      case 3:
        return (
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={dotStyle} />
              <View style={blank} />
            </View>
            <View style={styles.center}><View style={dotStyle} /></View>
            <View style={styles.row}>
              <View style={blank} />
              <View style={dotStyle} />
            </View>
          </View>
        )

      case 4:
        return (
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
            <View style={styles.row}>
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
          </View>
        )

      case 5:
        return (
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
            <View style={styles.center}><View style={dotStyle} /></View>
            <View style={styles.row}>
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
          </View>
        )

      case 6:
        return (
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
            <View style={styles.row}>
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
            <View style={styles.row}>
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
          </View>
        )

      default:
        return null
    }
  }

  return (
    <View style={[styles.container, dim, inverted ? CS.bgBlack : CS.bgWhite]}>
      {renderDots()}
    </View>
  )
}