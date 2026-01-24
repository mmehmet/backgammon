import { Svg, Circle, Defs, RadialGradient, Stop } from 'react-native-svg'
import { COLOURS } from '../utils/colours'
import { WHITE } from '../utils/constants'

export const Piece = ({ color, size = 28 }) => {
    const isWhite = color === WHITE
    const gradientId = `grad-${color}`

    // Colors for gradient - lighter at top, darker at bottom for bevelled look
    const mainColor = isWhite ? COLOURS.disabled : COLOURS.darkGrey
    const highlightColor = isWhite ? COLOURS.white : COLOURS.black

    return (
        <Svg width={size} height={size}>
            <Defs>
                <RadialGradient
                    id={gradientId}
                    cx="0.4"
                    cy="0.6"
                    r="1"
                >
                    <Stop offset="0%" stopColor={highlightColor} stopOpacity="1" />
                    <Stop offset="100%" stopColor={mainColor} stopOpacity="1" />
                </RadialGradient>
            </Defs>

            {/* Main piece with gradient */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={size / 2 - 2}
                fill={`url(#${gradientId})`}
            />

            {/* Border */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={size / 2 - 2}
                stroke={highlightColor}
                strokeWidth="3"
                fill="none"
            />
        </Svg>
    )
}