import { create } from 'zustand'

import { getDestination, getOpponent } from "./Logic"
import { PHASE, WHITE, BLACK, STARTING_POSITIONS, HOME } from '../utils/constants'

const initialBoard = () => {
  const board = []
  for (let i = 1; i <= 24; i++) {
    board[i] = STARTING_POSITIONS[i] || { count: 0, color: null }
  }

  return board
}

export const useGameStore = create((set, get) => {
  const canBearOff = (player) => {
    const { board, bar } = get()
    if (bar[player] > 0) return false

    return !board
      .filter(obj => obj.color === player)
      .some((p, i) => !HOME[player].includes(i))
  }

  const isLegalMove = (from, roll, player) => {
    const { board, bar } = get()

    if (from && bar[player] > 0) {
      return false
    }

    const dest = getDestination(from, roll, player)
    if (dest < 1 || dest > 24) {
      return canBearOff(player)
    }

    const destPoint = board[dest]

    return !(destPoint.color === getOpponent(player) && destPoint.count > 1)
  }
  
  return {
    board: initialBoard(),
    bar: { [WHITE]: 0, [BLACK]: 0 },
    bearOff: { [WHITE]: 0, [BLACK]: 0 },
    currentPlayer: null,
    dice: [],
    remainingMoves: [],
    phase: PHASE.OPENING,
    rolls: 0,

    applyMove: (from, roll, player) => {
      let hitOccurred = false

      set((state) => {
        const newBoard = [...state.board]
        const newBar = { ...state.bar }
        const newBearOff = { ...state.bearOff }

        if (!from) {
          newBar[player]--
        } else {
          newBoard[from] = { ...newBoard[from], count: newBoard[from].count - 1 }
          if (newBoard[from].count < 1) {
            newBoard[from] = { ...newBoard[from], color: null }
          }
        }

        const dest = getDestination(from, roll, player)
        if (dest < 1 || dest > 24) {
          newBearOff[player]++
          return { board: newBoard, bar: newBar, bearOff: newBearOff }
        }

        const opponent = getOpponent(player)
        const hit = newBoard[dest].color === opponent
        hitOccurred = hit
        newBoard[dest] = { color: player, count: hit ? 1 : newBoard[dest].count + 1 }
        if (hit) {
          newBar[opponent]++
        }

        return { board: newBoard, bar: newBar, bearOff: newBearOff }
      })

      return hitOccurred
    },

    executeMove: (move) => set((state) => {
      const moves = [...state.remainingMoves]
      if (moves.includes(move)) {
        return {
          remainingMoves: moves.filter((_, i) => i !== moves.indexOf(move))
        }
      }

      if (state.dice.length === 2) {
        return { remainingMoves: [] }
      }
      
      return { remainingMoves: moves.slice(move / moves[0]) }
    }),

    getLegalMoves: (player, remainingMoves) => {
      const { board, bar } = get()
      const moves = []
      const positions = bar[player] > 0 ? [0] : board
      const uniqueRolls = [...new Set(remainingMoves)]

      // Single-die moves
      positions.forEach((p, i) => {
        if (i === 0 || p?.color === player) {
          for (const roll of uniqueRolls) {
            if (isLegalMove(i, roll, player)) {
              moves.push({ roll, from: i })
            }
          }
        }
      })

      // Combo moves
      const validFromPositions = [...new Set(moves.map(m => m.from))]
      validFromPositions.forEach(from => {
        for (let i = 2; i <= remainingMoves.length; i++) {
          const sequence = remainingMoves.slice(0, i)
          const sum = sequence.reduce((acc, val) => acc + val, 0)

          let currentPos = from
          let valid = true
          for (const step of sequence) {
            if (!isLegalMove(currentPos, step, player)) {
              valid = false
              break
            }
            currentPos = getDestination(currentPos, step, player)
          }

          if (valid) {
            moves.push({ roll: sum, from })
          }
        }
      })

      return moves
    },

    setDice: (die1, die2) => set({
      dice: [die1, die2],
      remainingMoves: die1 === die2 ? [die1, die1, die1, die2] : [die1, die2]
    }),

    switchPlayer: () => set((state) => ({
      currentPlayer: state.currentPlayer === WHITE ? BLACK : WHITE,
      dice: [],
      remainingMoves: [],
      rolls: state.rolls + 1,
    })),

    startGame: (startingPlayer) => set({
      currentPlayer: startingPlayer,
      phase: PHASE.PLAYING,
      rolls: 0,
    }),

    resetBoard: () => set({
      board: initialBoard(),
      bar: { [WHITE]: 0, [BLACK]: 0 },
      bearOff: { [WHITE]: 0, [BLACK]: 0 }
    }),

    resetState: () => set({
      currentPlayer: null,
      dice: [],
      remainingMoves: [],
      phase: PHASE.OPENING,
      rolls: 0,
    })
  }
})