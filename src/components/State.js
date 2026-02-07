import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getDestination, getOpponent } from "./Logic"
import {
  PHASE,
  WHITE,
  BLACK,
  STARTING_POSITIONS,
  HOME,
  STORAGE_KEY,
  LEVELS,
} from '../utils/constants'

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

    return !board.some((p, i) => p?.color === player && !HOME[player].includes(i))
  }

  const isLegalMove = (from, roll, player) => {
    const { board, bar } = get()

    if (from > 0 && bar[player] > 0) {
      return false
    }

    const dest = getDestination(from, roll, player)
    // Bearing off
    if (dest < 1 || dest > 24) {
      if (!canBearOff(player)) return false

      // Check if exact bear-off or furthest back piece
      if (player === WHITE && dest === 25) return true
      if (player === BLACK && dest === 0) return true

      // For overshooting, piece must be furthest back
      const homePieces = board
        .map((p, i) => p?.color === player ? i : null)
        .filter(i => i !== null && HOME[player].includes(i))

      const furthestBack = player === WHITE
        ? Math.min(...homePieces)
        : Math.max(...homePieces)

      return from === furthestBack
    }

    const destPoint = board[dest]

    return !(destPoint.color === getOpponent(player) && destPoint.count > 1)
  }

  const getMoves = (available) => {
    const moves = []
    const len = available.length
    if (len) {
      moves.push([available[len - 1]])
      for (let i = len; i > 0; i--) {
        const move = available.slice(0, i)
        moves.push(move)

        if (i === 2 && available[0] !== available[1]) {
          moves.push([available[1], available[0]])
        }
      }
    }

    return moves
  }
  
  return {
    board: initialBoard(),
    bar: { [WHITE]: 0, [BLACK]: 0 },
    bearOff: { [WHITE]: 0, [BLACK]: 0 },
    points: { [WHITE]: 0, [BLACK]: 0 },
    currentPlayer: null,
    dice: [],
    remainingMoves: [],
    stake: 1,
    hasCube: null,
    phase: PHASE.OPENING,
    ai: false,
    difficulty: LEVELS.EASY,
    audio: true,

    acceptDouble: () =>
      set(state => ({
        stake: Math.min(state.stake * 2, 64),
        hasCube: getOpponent(state.currentPlayer),
      })),

    applyMove: (from, roll, player) => {
      let hitOccurred = false

      set(state => {
        const newBoard = [...state.board]
        const newBar = { ...state.bar }
        const newBearOff = { ...state.bearOff }

        if (from < 0) {
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

    clearSavedGame: async () => {
      await AsyncStorage.removeItem(STORAGE_KEY)
      set({ points: { [WHITE]: 0, [BLACK]: 0 } })
    },

    endGame: () => set({ phase: PHASE.FINISHED }),

    executeMove: (move) => set(state => {
      const moves = [...state.remainingMoves]
      if (moves.includes(move)) {
        return {
          remainingMoves: moves.filter((_, i) => i !== moves.indexOf(move))
        }
      }

      if (state.dice.length === 2 && state.dice[0] !== state.dice[1]) {
        return { remainingMoves: [] }
      }

      return { remainingMoves: moves.slice(move / moves[0]) }
    }),

    getLegalMoves: (player, remainingMoves) => {
      const { board, bar } = get()
      const possible = getMoves(remainingMoves)
      const moves = []
      const positions = bar[player] > 0 ?
        [-1] :
        board.map((p, i) => (p?.color === player ? i : null)).filter(i => i !== null)

      positions.forEach(from => {
        possible.forEach(sequence => {
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
        })
      })

      return moves
    },

    hasSavedGame: async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY)
        return data !== null
      } catch {
        return false
      }
    },

    resetBoard: () => set({
      board: initialBoard(),
      bar: { [WHITE]: 0, [BLACK]: 0 },
      bearOff: { [WHITE]: 0, [BLACK]: 0 },
      stake: 1,
      hasCube: null,
    }),

    resetState: (aiPlayer, level, useAudio) => set({
      points: { [WHITE]: 0, [BLACK]: 0 },
      currentPlayer: null,
      dice: [],
      remainingMoves: [],
      phase: PHASE.OPENING,
      ai: aiPlayer,
      difficulty: level,
      audio: useAudio,
    }),

    restoreGame: async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY)
        if (savedData) {
          set(JSON.parse(savedData))
          return true
        }
      } catch (error) {
        console.error('Restore failed:', error)
      }

      return false
    },

    saveGame: async () => {
      try {
        const state = get()
        const saveData = {
          points: state.points,
          board: state.board,
          bar: state.bar,
          bearOff: state.bearOff,
          currentPlayer: state.currentPlayer,
          dice: state.dice,
          remainingMoves: state.remainingMoves,
          phase: state.phase,
          stake: state.stake,
          hasCube: state.hasCube,
          ai: state.ai,
          difficulty: state.difficulty,
          audio: state.audio,
        }
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saveData))
        return true
      } catch (error) {
        console.error('Save failed:', error)
        return false
      }
    },

    setDice: (die1, die2) => set({
      dice: [die1, die2],
      remainingMoves: die1 === die2 ? [die1, die1, die1, die2] : [die1, die2]
    }),

    startGame: (startingPlayer) => set({
      currentPlayer: startingPlayer,
      phase: PHASE.PLAYING,
    }),

    switchPlayer: async () => {
      await get().saveGame()
      set(state => ({
        currentPlayer: state.currentPlayer === WHITE ? BLACK : WHITE,
        dice: [],
        remainingMoves: [],
      }))
    },

    updatePoints: (winner) => {
      const { board, bar, bearOff, stake } = get()
      const loser = getOpponent(winner)

      if (bearOff[loser] > 0 || bearOff[winner] < 15) {
        set(state => ({
          points: { ...state.points, [winner]: state.points[winner] + stake },
          dice: [],
          remainingMoves: [],
        }))

        return stake
      }

      let points = 2 * stake
      if (
        bar[loser] > 0 ||
        board.some((p, i) => p?.color === loser && HOME[winner].includes(i))
      ) {
        points = 3 * stake
      }

      set(state => ({
        points: { ...state.points, [winner]: state.points[winner] + points },
        dice: [],
        remainingMoves: [],
      }))

      return points
    },
  }
})