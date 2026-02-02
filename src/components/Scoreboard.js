import { View, Text } from 'react-native'

import { Piece } from './Piece'
import CS from '../styles/CommonStyles'
import { BLACK, WHITE } from '../utils/constants'

export const Scoreboard = ({ points, red = false }) => (
  <View style={[CS.row, CS.centre]}>
    <View style={[CS.scores, red ? CS.bgRed : null, red ? CS.half : null]}>
      <Piece color={BLACK} />
      <Text style={[CS.buttonText, CS.black]}>{points[BLACK]}</Text>
    </View>
    <View style={[CS.scores, red ? CS.bgRed : null, red ? CS.half : null]}>
      <Piece color={WHITE} />
      <Text style={CS.buttonText}>{points[WHITE]}</Text>
    </View>
  </View>
)