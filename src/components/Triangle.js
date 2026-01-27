import { Line, Polygon, Svg } from "react-native-svg"
import { COLOURS } from "../utils/colours"

const width = 40
const height = 120

export const Triangle = ({ fill, source = false, dest = false }) => {
  const points = `0,${height} ${width / 2},0 ${width},${height}`

  return (
    <Svg width={width} height={height}>
      <Polygon points={points} fill={fill} />
      {source && (
        <Line
          x1="0"
          y1={height}
          x2={width}
          y2={height}
          stroke={COLOURS.blue}
          strokeWidth="6"
        />
      )}
      {dest && (
        <Line
          x1="0"
          y1={height}
          x2={width}
          y2={height}
          stroke={COLOURS.green}
          strokeWidth="6"
        />
      )}
    </Svg>
  )
}