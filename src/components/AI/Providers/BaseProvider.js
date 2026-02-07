import { AI_CONFIG, BLACK, LEVELS, WHITE } from '../../../utils/constants'

class BaseProvider {
  difficulty = LEVELS.MEDIUM

  chooseMove = (moves) => {
    if (!moves?.length) return []

    // play like a DRUNKEN master - sometimes randomly fucking it up
    let chosen = moves[0]
    const config = AI_CONFIG[this.difficulty]
    if (this.difficulty < LEVELS.HARD && Math.random() < config.RANDOM) {
      const poolSize = Math.ceil(moves.length * config.RISK)
      const pool = moves.slice(0, poolSize)
      chosen = pool[pool.length - 1]  // Pick worst from pool
    }
    console.debug("chosen move", chosen)

    return chosen
  }

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