export const WHITE = 'WHITE'
export const BLACK = 'BLACK'
export const HOME = {
  [WHITE]: [1, 2, 3, 4, 5, 6],
  [BLACK]: [24, 23, 22, 21, 20, 19]
}
export const PHASE = {
  OPENING: 'OPENING',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED'
}
export const MSG = {
  START: '{player} has the higher roll and will start.',
  CAN_ROLL: '{player} can roll.',
  DOUBLE: '{player} has rolled a double!',
  MOVES_REMAINING: '{player} has {count} {move} remaining.',
  NO_LEGAL_MOVES: '{player} has no legal moves - switching to {nextPlayer}',
  EMPTY: '',
  TIE: "It's a tie! Roll again...",
}