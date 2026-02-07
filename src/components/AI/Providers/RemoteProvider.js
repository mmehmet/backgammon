import BaseProvider from './BaseProvider'
import { API_URL, BLACK, WHITE } from '../../../utils/constants'

const reformat = (board, bar, dice = []) => {
  // WildBG considers itself (BLACK) to be "x" and "you" (WHITE) to be "opponent"
  // thus WHITE (opponent) "checkers" counts should be NEGATIVE, and BLACK are POSITIVE
  const params = new URLSearchParams()

  // the BAR positions are also WEIRD (25 = BLACK bar, 0 = WHITE bar)
  if (bar[BLACK] > 0) {
    params.set('p25', (bar[BLACK]).toString()) // POSITIVE values for BLACK
  }

  if (bar[WHITE] > 0) {
    params.set('p0', (-bar[WHITE]).toString()) // NEGATIVE values for WHITE
  }

  // Board positions 1-24
  for (let i = 1; i <= 24; i++) {
    if (board[i].count > 0) {
      const value = board[i].color === BLACK ? board[i].count : -board[i].count
      params.set(`p${i}`, value.toString())
    }
  }

  if (dice.length > 0) {
    params.set('die1', dice[0])
    params.set('die2', dice[1])
  }

  return params.toString()
}

class RemoteProvider extends BaseProvider {
  getMove = async ({ dice, board, bar }) => {
    const params = reformat(board, bar, dice)
    const response = await fetch(`${API_URL}/move?${params}`)
    const data = await response.json()

    return this.chooseMove(data['moves']).play
  }

  getName = () => "REMOTE"

  shouldDouble = async ({ board, bar }) => {
    const params = reformat(board, bar)
    const response = await fetch(`${API_URL}/eval?${params}`)
    const data = await response.json()
    return data.cube.double
  }

  shouldAcceptDouble = async ({ board, bar }) => {
    const params = reformat(board, bar)
    const response = await fetch(`${API_URL}/eval?${params}`)
    const data = await response.json()
    return data.cube.accept
  }
}

export default RemoteProvider