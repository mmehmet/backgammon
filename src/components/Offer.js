import { Pressable, Text, View } from 'react-native'

import CS from '../styles/CommonStyles'
import styles from '../styles/GameStyles'
import { ucFirst } from '../utils/helpers'

export const Offer = ({ onAccept, onDecline, from }) => (
  <View style={CS.gap}>
    <Text style={styles.text}>{ucFirst(from)} offers to Double</Text>
    <View style={[CS.rowGap, CS.centre]}>
      <Pressable style={[styles.button]} onPress={onDecline}>
        <Text style={styles.text}>❌ No</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.buttonGreen]} onPress={onAccept}>
        <Text style={styles.text}>✔ Yes</Text>
      </Pressable>
    </View>
  </View>
)