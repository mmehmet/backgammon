import BaseProvider from './BaseProvider'
import { API_URL, BLACK, WHITE } from '../../utils/constants'

const reformat = (board, bar, dice = []) => {
  const params = new URLSearchParams()

  if (dice.length > 0) {
    params.set('die1', dice[0])
    params.set('die2', dice[1])
  }

  // Bar positions (0 = BLACK bar, 25 = WHITE bar)
  if (bar[BLACK] > 0) {
    params.set('p0', bar[BLACK].toString())
  }

  if (bar[WHITE] > 0) {
    params.set('p25', (-1 * bar[WHITE]).toString())
  }

  // Board positions 1-24
  for (let i = 1; i <= 24; i++) {
    if (board[i].count > 0) {
      const value = board[i].color === BLACK ? board[i].count : -board[i].count
      params.set(`p${i}`, value.toString())
    }
  }

  return params.toString()
}

class RemoteProvider extends BaseProvider {
  getMove = async ({ dice, board, bar }) => {
    const params = reformat(board, bar, dice);
    const response = await fetch(`${API_URL}/move?${params}`);
    const data = await response.json();

    return data['moves'][0].play;
  };

  shouldDouble = async ({ board, bar }) => {
    const params = reformat(board, bar);
    const response = await fetch(`${API_URL}/eval?${params}`);
    const data = await response.json();
    return data.cube.double;
  };

  shouldAcceptDouble = async ({ board, bar }) => {
    const params = reformat(board, bar);
    const response = await fetch(`${API_URL}/eval?${params}`);
    const data = await response.json();
    return data.cube.accept;
  };
}

export default RemoteProvider