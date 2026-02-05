import BaseProvider from './BaseProvider'
import { API_URL } from '../../utils/constants'

class RemoteProvider extends BaseProvider {
  params = ""

  getMove = async (player, dice, board, _remainingMoves) => {
    this.reformat(player, dice, board)
    const response = await fetch(`${API_URL}/move?${this.params}`)
    const data = await response.json()

    return data["moves"][0].play
  }

  shouldDouble = async (player, board, _cubeValue) => {
    this.reformat(player, [1, 1], board)
    const response = await fetch(`${API_URL}/eval?${this.params}`)
    const data = await response.json()
    return data.cube.double
  }

  shouldAcceptDouble = async (player, board, _cubeValue) => {
    this.reformat(player, [1, 1], board)
    const response = await fetch(`${API_URL}/eval?${this.params}`)
    const data = await response.json()
    return data.cube.accept
  }

  reformat = (player, dice, board) => {
    const params = new URLSearchParams()

    params.set('die1', dice[0])
    params.set('die2', dice[1])

    // Bar positions
    if (board[25].count > 0) {
      params.set('p25', board[25].count)
    }
    if (board[0].count > 0) {
      params.set('p0', -board[0].count)
    }

    // Board positions 1-24
    for (let i = 1; i <= 24; i++) {
      if (board[i].count > 0) {
        const value = board[i].color === player ? board[i].count : -board[i].count
        params.set(`p${i}`, value)
      }
    }

    this.params = params.toString()
  }
}

export default RemoteProvider