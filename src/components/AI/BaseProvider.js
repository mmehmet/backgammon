import { BLACK, LEVELS, WHITE } from '../../utils/constants'

class BaseProvider {
  difficulty = LEVELS.MEDIUM

  setDifficulty = (difficulty) => {
    this.difficulty = difficulty
  }

  getTotalBoard = (board, bar) => {
    const aiBoard = []
    aiBoard[0] = { count: bar[BLACK], color: bar[BLACK] > 0 ? BLACK : null }
    for (let i = 1; i <= 24; i++) {
      aiBoard[i] = board[i]
    }
    aiBoard[25] = { count: bar[WHITE], color: bar[WHITE] > 0 ? WHITE : null }
    return aiBoard
  }
}

export default BaseProvider