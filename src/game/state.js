import { BLACK, WHITE } from "../utils/constants"

export const gameState = {
  currentPlayer: null,
  dice: [],
  remainingMoves: []
}

export const switchPlayer = () => {
  gameState.currentPlayer = gameState.currentPlayer === WHITE ? BLACK : WHITE
}

export const setDice = (die1, die2) => {
  gameState.dice = [die1, die2]
  gameState.remainingMoves = die1 === die2
    ? [die1, die1, die1, die1]
    : [die1, die2]
}

export const useMove = (roll) => {
  const index = gameState.remainingMoves.indexOf(roll)
  if (index > -1) {
    gameState.remainingMoves.splice(index, 1)
  }
}

export const resetState = () => {
  gameState.currentPlayer = null
  gameState.dice = []
  gameState.remainingMoves = []
}