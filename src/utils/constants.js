export const WHITE = 'WHITE'
export const BLACK = 'BLACK'
export const LANDSCAPE_LEFT = 'LANDSCAPE-LEFT'
export const LANDSCAPE_RIGHT = 'LANDSCAPE-RIGHT'
export const GAMMON = 'GAMMON'
export const BACKGAMMON = 'BACKGAMMON'

export const API_URL = 'http://46.224.159.43'

export const LEVELS = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2
}
export const AI_CONFIG = {
  EASY: {
    COST: 30,
    REWARD: 40,
    TURN_VALUE: 10,
    POINT_VALUE: 20,
    PRIME_VALUE: 15,
    RISK: 0.3,
    RANDOM: 0.25 // 25% random moves
  },
  MEDIUM: {
    COST: 70,
    REWARD: 85,
    TURN_VALUE: 25,
    POINT_VALUE: 50,
    PRIME_VALUE: 40,
    RISK: 0.7,
    RANDOM: 0.15 // Sometimes picks 2nd/3rd best
  },
  HARD: {
    COST: 100,
    REWARD: 120,
    TURN_VALUE: 35,
    POINT_VALUE: 75,
    PRIME_VALUE: 60,
    RISK: 1.0,
    RANDOM: 0 // NO randomness
  }
}
export const PROGRESSION = {
  OPENING: 0,
  CONTACT: 1,
  RACING: 2,
  BEAR_OFF: 3,
}
export const THREATS = {
  WEAK: 0,
  ESCAPING: 1,
  STRONG: 2,
}
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
  NO_LEGAL_MOVES: '{player} has no legal moves! Switching to {nextPlayer}...',
  EMPTY: '',
  TIE: "It's a tie! Roll again...",
  WINNER: '{player} wins the match!'
}
export const STORAGE_KEY = '@backgammon_game_state'