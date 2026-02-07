import { Pressable, Text } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"

import CS from "../styles/CommonStyles"
import { COLOURS } from "../utils/colours"
import { WHITE } from "../utils/constants"

export const RollButton = ({ player = null, onPress, currentPlayer = null, disabled = false }) => {
  const isWhite = player === WHITE || currentPlayer === WHITE
  const font = !currentPlayer ? [] : [CS.buttonTextRegular]
  const styling = [CS.button, CS.align, CS.rowGap, isWhite ? CS.bgWhite : CS.bgBlack]
  if (disabled) {
    styling.push({ backgroundColor: COLOURS.darkGrey })
    font.push({ color: COLOURS.grey })
  }
  if (isWhite) {
    font.push(CS.buttonTextDark)
  }

  return (
    <Pressable style={styling} onPress={onPress}>
      <Text style={[CS.buttonText, font]}>Roll</Text>
      {
        !currentPlayer
          ? null
          : <Icon name="dice" size={20} color={isWhite ? COLOURS.black : COLOURS.white} />
      }
    </Pressable>
  )
}