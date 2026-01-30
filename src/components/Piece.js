import { Svg, Circle, Defs, RadialGradient, Stop } from 'react-native-svg'
import { COLOURS } from '../utils/colours'
import { WHITE } from '../utils/constants'

export const diameter = 28

export const Piece = ({ color }) => {
    const isWhite = color === WHITE
    const gradientId = `grad-${color}`

    // Colors for gradient - lighter at top, darker at bottom for bevelled look
    const mainColor = isWhite ? COLOURS.offWhite : COLOURS.offBlack
    const shadowColor = isWhite ? COLOURS.disabled : COLOURS.darkGrey
    const highlightColor = isWhite ? COLOURS.white : COLOURS.black
    const borderColor = isWhite ? COLOURS.darkGrey : COLOURS.mediumGrey

    return (
        <Svg width={diameter} height={diameter}>
            <Defs>
                <RadialGradient
                    id={gradientId}
                    cx="0.4"
                    cy="0.6"
                    r="1"
                >
                    <Stop offset="0%" stopColor={highlightColor} stopOpacity="1" />
                    <Stop offset="70%" stopColor={mainColor} stopOpacity="1" />
                    <Stop offset="100%" stopColor={shadowColor} stopOpacity="1" />
                </RadialGradient>
            </Defs>

            {/* Main piece with gradient */}
            <Circle
                cx={diameter / 2}
                cy={diameter / 2}
                r={diameter / 2 - 2}
                fill={`url(#${gradientId})`}
            />

            {/* Bevel */}
            <Circle
                cx={diameter / 2}
                cy={diameter / 2}
                r={diameter / 2 - 7}
                stroke={COLOURS.disabled}
                strokeWidth={0.7}
                fill="none"
                opacity={0.25}
            />

            {/* Border */}
            <Circle
                cx={diameter / 2}
                cy={diameter / 2}
                r={diameter / 2 - 1.5}
                stroke={borderColor}
                strokeWidth={1.5}
                fill="none"
                opacity={0.25}
            />
        </Svg>
    )
}