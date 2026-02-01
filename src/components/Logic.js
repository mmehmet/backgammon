import { WHITE, BLACK } from "../utils/constants"

export const getDestination = (from, roll, player) => {
  if (from < 0) {
    return player === WHITE ? roll : (25 - roll)
  }

  return from + roll * (player === WHITE ? 1 : -1)
}

export const getOpponent = (player) => player === WHITE ? BLACK : WHITE