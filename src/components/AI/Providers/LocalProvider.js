import BaseProvider from './BaseProvider'
import { PROGRESSION, THREATS } from "../../../utils/constants"

const evaluate = (player, board) => {
  // TODO: Calculate position strength for doubling decisions
  return 0
}

const expectedRecovery = (player, board) => {
  // TODO: expected_lost_turns = (1 / recovery_probability) - 1
  return 0
}

const getPlayerPrimes = (player, board) => {
  // TODO: find all consecutive points on the board blocked by player
  return []
}

const getPlayerThreat = (player, board) => {
  // TODO: is player winning/losing, strong/weak, gaining/losing momentum?
  return THREATS.WEAK
}

const hitProbability = (target, board, dice) => {
  // TODO: gather all possible combinations of dice rolls from all possible opponent positions at target and calculate percentage
  return 0
}

const momentum = (board, bar) => {
  // TODO: from AI perspective, are we winning/losing/even?
  return 0
}

const phase = (board) => {
  // TODO: current phase of the game, from AI perspective
  return PROGRESSION.OPENING
}

const recoveryProbability = (player, board) => {
  // TODO: is player's HOME blocked and if so, how bad is it?
  return 0
}

const score = (moves, player, board) => {
  // TODO: Heuristic scoring
  return 0
}

class LocalProvider extends BaseProvider {
  getMove = async ({ board, bar, remainingMoves }) => {
    // TODO: evaluate best next move
    return []
  }

  getName = () => "LOCAL"

  shouldDouble = async ({ board, bar, stake }) => {
    // TODO: evaluate position strength
    return false
  }

  shouldAcceptDouble = async ({ board, bar, stake }) => {
    // TODO: evaluate position strength
    return true
  }
}

export default LocalProvider