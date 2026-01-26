import { WHITE, BLACK } from '../utils/constants'

export const board = []
export const bar = { [WHITE]: 0, [BLACK]: 0 }
export const bearOff = { [WHITE]: 0, [BLACK]: 0 }

export const resetBoard = () => {
  for (let i = 1 ;i <= 24; i++) {
    board[i] = { count: 0, color: null }
  }

  setStartingPosition()
  bar[BLACK] = 0
  bar[WHITE] = 0
  bearOff[BLACK] = 0
  bearOff[WHITE] = 0
}

const setStartingPosition = () => {
  board[1] = { count: 2, color: WHITE }
  board[6] = { count: 5, color: BLACK }
  board[8] = { count: 3, color: BLACK }
  board[12] = { count: 5, color: WHITE }
  board[13] = { count: 5, color: BLACK }
  board[17] = { count: 3, color: WHITE }
  board[19] = { count: 5, color: WHITE }
  board[24] = { count: 2, color: BLACK }
}