import { Pressable, Text } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"

import CS from "../styles/CommonStyles"
import { COLOURS } from "../utils/colours"
import { WHITE } from "../utils/constants"

export const RollButton = ({ player = null, onPress, currentPlayer = null }) => {
  const isWhite = player === WHITE || currentPlayer === WHITE
  const font = !currentPlayer ? null : CS.buttonTextRegular

  return (
    <Pressable style={[CS.button, CS.align, CS.row, CS.gap, isWhite ? CS.bgWhite : CS.bgBlack]} onPress={onPress}>
      <Text style={[CS.buttonText, font, isWhite && CS.buttonTextDark]}>Roll</Text>
      {
        !currentPlayer
          ? null
          : <Icon name="dice" size={20} color={isWhite ? COLOURS.black : COLOURS.white} />
      }
    </Pressable>
  )
}