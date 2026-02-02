import { Pressable, Text } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { COLOURS } from "../utils/colours"
import CS from "../styles/CommonStyles"
import styles from "../styles/GameStyles"

export const ExitButton = ({ onEndGame }) => (
  <Pressable style={[styles.button, CS.row, CS.gap, CS.centre]} onPress={onEndGame}>
    <Text style={CS.buttonText}>Exit</Text>
    <Icon name="exit-to-app" size={20} color={COLOURS.white} />
  </Pressable>
)