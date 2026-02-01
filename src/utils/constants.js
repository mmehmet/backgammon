export const WHITE = 'WHITE'
export const BLACK = 'BLACK'
export const HOME = {
  [BLACK]: [1, 2, 3, 4, 5, 6],
  [WHITE]: [24, 23, 22, 21, 20, 19]
}
export const STARTING_POSITIONS = {
  1: { count: 2, color: WHITE },
  6: { count: 5, color: BLACK },
  8: { count: 3, color: BLACK },
  12: { count: 5, color: WHITE },
  13: { count: 5, color: BLACK },
  17: { count: 3, color: WHITE },
  19: { count: 5, color: WHITE },
  24: { count: 2, color: BLACK }
}
export const PHASE = {
  OPENING: 'OPENING',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED'
}
export const MSG = {
  ON_BAR: '{player} is on the bar',
  START: '{player} has the higher roll and will start.',
  DOUBLE: '{player} has rolled a double!',
  MOVES_REMAINING: '{player} has {count} {move} remaining.',
  NO_LEGAL_MOVES: '{player} has no legal moves - switching to {nextPlayer}',
  EMPTY: '',
  TIE: "It's a tie! Roll again...",
}
export const STORAGE_KEY = '@backgammon_game_state'