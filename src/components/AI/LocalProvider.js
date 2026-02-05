import BaseProvider from './BaseProvider'

class LocalProvider extends BaseProvider {
  getMove = async (player, dice, board, remainingMoves) => {
    return []
  }

  shouldDouble = async (player, board, cubeValue) => {
    // TODO: Evaluate position strength
    return false
  }

  shouldAcceptDouble = async (player, board, cubeValue) => {
    // TODO: Evaluate position strength
    return true
  }

  scoreMove = (moveSequence, player, board) => {
    // TODO: Heuristic scoring
    return 0
  }

  evaluatePosition = (player, board) => {
    // TODO: Calculate position strength for doubling decisions
    return 0
  }
}

export default LocalProvider