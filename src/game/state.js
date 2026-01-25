import { create } from 'zustand'
import { PHASE, WHITE, BLACK } from '../utils/constants'

export const useGameStore = create((set) => ({
  currentPlayer: null,
  dice: [],
  remainingMoves: [],
  phase: PHASE.OPENING,

  setDice: (die1, die2) => set({
    dice: [die1, die2],
    remainingMoves: die1 === die2 ? [die1, die1, die1, die2] : [die1, die2]
  }),

  switchPlayer: () => set((state) => ({
    currentPlayer: state.currentPlayer === WHITE ? BLACK : WHITE
  })),

  useMove: (roll) => set((state) => ({
    remainingMoves: state.remainingMoves.filter((_, i) => i !== state.remainingMoves.indexOf(roll))
  })),

  startGame: (startingPlayer) => set({
    currentPlayer: startingPlayer,
    phase: PHASE.PLAYING
  }),

  resetState: () => set({
    currentPlayer: null,
    dice: [],
    remainingMoves: [],
    phase: PHASE.OPENING
  })
}))