import { WHITE, BLACK, HOME } from "../utils/constants"
import { board, bar, bearOff } from "./Board"

export const applyMove = (from, roll, player) => {
  // take piece from the starting position
  if (!from) {
    bar[player]--
  } else {
    board[from].count--
    if (board[from].count < 1) {
      board[from].color = null
    }
  }

  // move it to the destination
  const dest = getDestination(from, roll, player)
  if (dest < 1 || dest > 24) {
    bearOff[player]++

    return
  }

  const opponent = getOpponent(player)
  const hit = board[dest].color === opponent
  board[dest].color = player
  if (hit) {
    board[dest].count = 1
    bar[opponent]++
  } else {
    board[dest].count++
  }
}

export const canBearOff = (player) => {
  if (bar[player] > 0) return false

  return !board
    .filter(obj => obj.color === player)
    .some((p, i) => !HOME[player].includes(i))
}

export const getLegalMoves = (player, remainingMoves) => {
  const moves = []
  const positions = bar[player] > 0 ? [0] : board
  const uniqueRolls = [...new Set(remainingMoves)]
  
  positions.forEach((p, i) => {
    if (i === 0 || p?.color === player) {
      for (const roll of uniqueRolls) {
        if (isLegalMove(i, roll, player)) {
          moves.push({  roll, from: i })
        }
      }
    }
  })

  return moves
}

export const getOpponent = (player) => player === WHITE ? BLACK : WHITE

export const hasWon = (player) => bearOff[player] === 15

export const isLegalMove = (from, roll, player) => {
  if (from && bar[player] > 0) {
    return false
  }

  const dest = getDestination(from, roll, player)
  if (dest < 1 || dest > 24) {
    const piecesOutside = player === WHITE
      ? board.slice(19, from).some(point => point?.color === player)
      : board.slice(from + 1, 7).some(point => point?.color === player)

    return !piecesOutside
  }

  const destPoint = board[dest]

  return !(destPoint.color === getOpponent(player) && destPoint.count > 1)
}

const getDestination = (from, roll, player) => {
  if (!from) {
    return player === WHITE ? roll : (25 - roll)
  }

  return from + roll * (player === WHITE ? 1 : -1)
}