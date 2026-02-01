import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg'
import { COLOURS } from '../utils/colours'
import { WHITE } from '../utils/constants'
import { diameter } from './Piece'

export const SidePiece = ({ color }) => {
    const isWhite = color === WHITE
    const gradientId = `horiz-grad-${color}`
    const height = diameter / 4

    const mainColor = isWhite ? COLOURS.offWhite : COLOURS.offBlack
    const shadowColor = isWhite ? COLOURS.grey : COLOURS.mediumGrey
    const highlightColor = isWhite ? COLOURS.white : COLOURS.black

    return (
        <Svg height={height} width={diameter}>
            <Defs>
                <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0%" stopColor={highlightColor} />
                    <Stop offset="5%" stopColor={shadowColor} />
                    <Stop offset="35%" stopColor={mainColor} />
                    <Stop offset="50%" stopColor={COLOURS.grey} />
                    <Stop offset="65%" stopColor={mainColor} />
                    <Stop offset="95%" stopColor={shadowColor} />
                    <Stop offset="100%" stopColor={highlightColor} />
                </LinearGradient>
            </Defs>
            <Rect
                x="0"
                y="0"
                width={diameter}
                height={height}
                rx="1.5"
                ry="1.5"
                fill={`url(#${gradientId})`}
            />
        </Svg>
    )
}