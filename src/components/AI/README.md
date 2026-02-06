# AI Player Implementation

## What We're Building
A self-contained heuristic AI that runs in the React Native app, either via WildBG API or fully locally implemented.

---

## PHASE 1: WildBG API Integration (DO THIS FIRST)
**Goal:** Get working AI immediately for testing

**Components:**
1. Board state → WildBG format converter
2. API call wrapper with error handling
3. Response parser → execute move in the game
4. Fallback to random if API fails

**Time:** 3-4 hours **Deliverable:** Working AI opponent you can play against today

**Why first?** Proves the game is fun with AI, validates the effort of building fallback.

---

## PHASE 2: Heuristic AI Framework (Core Logic)
**Goal:** Build the engine that evaluates and scores moves

### 2A: Probability Calculator (5 hours)
**What it does:**
- Given board position and dice, calculate hit probabilities
- Calculate re-entry probabilities from bar
- Calculate expected recovery times

**Functions needed:**
```javascript
calculateHitProbability(position, opponentPieces, dice)
calculateReEntryProbability(homeBoard)
calculateExpectedRecoveryTurns(homeBoard)
countConsecutivePoints(board, player) // For prime detection
```

**Deliverable:** Math engine that returns probabilities

### 2B: Move Evaluator (8 hours)
**What it does:**
- Takes a legal move and board state
- Scores it based on strategic heuristics
- Returns numerical score

**Heuristics to implement:**
1. **Safety scoring:**
    - Penalty for exposed blots (risk-adjusted by hit probability)
    - Reward for making points (two pieces safe)

2. **Offense scoring:**
    - Reward for hitting opponent (adjusted by their recovery difficulty)
    - Reward for building blocking points
    - Reward for extending primes

3. **Position scoring:**
    - Reward for home board development
    - Penalty for being trapped behind opponent prime
    - Reward for escaping opponent territory

4. **Endgame scoring:**
    - Reward for efficient bear-off
    - Penalty for wasted pips

**Functions needed:**
```javascript
evaluateMove(move, board, context)
scoreBlotRisk(position, board, probabilities)
scoreHitOpponent(move, board, probabilities)
scorePrimeBuilding(move, board)
scorePositionalAdvantage(move, board)
```

**Deliverable:** Move scoring engine

### 2C: Context Analyzer (5 hours)
**What it does:**
- Analyzes current game state
- Determines phase, momentum, structures
- Used to adjust scoring weights

**Functions needed:**
```javascript
analyzeGamePhase(board)         // 'opening', 'contact', 'racing', 'bearoff'
assessPlayerPosition(board, player)  // 'strong', 'vulnerable', 'trapped'
calculateMomentum(board)        // 'winning', 'losing', 'even'
assessPrimeThreats(board)       // Both players' prime situations
```

**Deliverable:** Context assessment that feeds into weight adjustment

---

## PHASE 3: AI Decision Engine (3 hours)
**What it does:**
- Gets all legal moves from the existing `getLegalMoves()`
- Scores each move using evaluator
- Picks highest scoring move
- Adds delay for natural feel

**Functions needed:**
```javascript
getAIMove(board, dice, player, difficulty)
  // 1. Get legal moves (we already have this)
  // 2. Analyze context
  // 3. Adjust weights for difficulty + context
  // 4. Score all moves
  // 5. Pick best (or deliberately pick worse for Easy/Medium)
  // 6. Return move
```

**Deliverable:** Function that returns "AI's chosen move"

---

## PHASE 4: Difficulty Levels (4 hours)
**What it does:**
- Defines constant sets for Easy/Medium/Hard
- Implements difficulty-based behavior

**Constants to tune:**
```javascript
const AI_CONFIG = {
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
```

**Deliverable:** Three AI personalities to play against

---

## PHASE 5: Integration (3 hours)
**What it does:**
- Implements provider architecture with factory pattern
- Connects AI to existing game flow
- Adds UI for difficulty selection
- Implements AI turn handling

### Provider Architecture

**File Structure:**
```
src/components/AI/
  BaseProvider.js       - Abstract base class with interface
  RemoteProvider.js     - WildBG API implementation
  LocalProvider.js      - Heuristic AI implementation
  ProviderFactory.js    - Factory to create providers
```

**BaseProvider Interface:**
```javascript
class BaseProvider {
  difficulty = LEVELS.MEDIUM
  
  setDifficulty(difficulty) { }
  getTotalBoard(board, bar) { }  // Converts to 0-25 array format
  getMove(player, dice, board, remainingMoves) { }  // Returns [{from, to}, ...]
  shouldDouble(player, board, cubeValue) { }
  shouldAcceptDouble(player, board, cubeValue) { }
}
```

**Game Integration:**
New Game Settings Screen/Modal (in StartScreen):

- Number of players: 1 (vs AI) or 2 (hot seat)
- If 1 player: Difficulty selector (Easy/Medium/Hard)
- Audio toggle (on/off)
- Start game button

**Game Flow:**

- Factory creates provider based on settings (RemoteProvider with fallback to LocalProvider)
- Set difficulty on provider using selected level
- Game detects when current player is AI-controlled
- On AI turn: provider returns move sequence as [{from, to}, ...]
- Convert to {from, roll} format and execute via existing game functions
- Add thinking delay for natural feel

**Deliverable:** Playable AI opponent with seamless provider switching

---

## PHASE 6: Tuning (20-40 hours)
**What it does:**
- Play against Easy AI (5-10 hours)
- Adjust constants, observe behavior
- Play against Medium AI (10-15 hours)
- Fine-tune until challenging
- Play against Hard AI (10-15 hours)
- Polish until legitimately good

**This is iterative:** Play → Notice issues → Adjust constants → Repeat

**Deliverable:** Well-balanced AI that's fun to play against

---

## TIME BREAKDOWN

| Phase                | Hours           | What You're Doing           |
|----------------------|-----------------|-----------------------------|
| 1. WildBG API        | 3-4             | Coding integration          |
| 2A. Probabilities    | 5               | Coding math                 |
| 2B. Move Evaluator   | 8               | Coding heuristics           |
| 2C. Context Analyzer | 5               | Coding game analysis        |
| 3. Decision Engine   | 3               | Wiring it together          |
| 4. Difficulty Levels | 4               | Setting up presets          |
| 5. Integration       | 3               | Connecting to the game      |
| 6. Tuning            | 20-40           | Playing backgammon          |
| **TOTAL**            | **51-72 hours** | **30-40 hours is gameplay** |

---

## The Core Components

### 1. Probability Calculator (the foundation)

For any exposed piece:
- Count how many dice combinations hit it
- Probability = hit_combos / 36

This is straightforward math - no learning required.

**Example: 11 positions away**

- 5 on first die, 6 on second die (one combination)
- 6 on first die, 5 on second die (another combination)
- Probability = 2/36 = 5.56%

**Example: 6 positions away** - the combinations are:

- 6-0: Not possible (no zero on dice)
- 5-1: 2 ways (5-1, 1-5)
- 4-2: 2 ways (4-2, 2-4)
- 3-3: 1 way (doubles)
- Total: 5 combinations / 36 = 13.9%

**The general rule:**

- Non-doubles (like 5-6): 2 combinations
- Doubles (like 3-3): 1 combination
- Different pips same total (like 4-2 and 3-3 both equal 6): count each separately

### 2. Risk Assessment (what we actually do)

**When I'm considering leaving a blot exposed:**

```
risk_score = hit_probability × punishment_value

punishment_value = base_cost × recovery_difficulty

recovery_difficulty = {
  their_home_blocked_0_points: 1.0,    // Easy re-entry
  their_home_blocked_1_point: 1.2,
  their_home_blocked_2_points: 1.5,
  their_home_blocked_3_points: 2.0,
  their_home_blocked_4_points: 3.5,    // Brutal
  their_home_blocked_5_points: 6.0     // Devastating
}
```

**If they have 4+ points blocked in their home?**

- I get hit → stuck on bar for multiple turns
- Punishment value goes from 100 → 350+
- A 5% hit chance becomes worth avoiding

**When I'm considering hitting THEIR blot:**
```
hit_value = base_reward × opponent_recovery_difficulty

opponent_recovery_difficulty = {
  my_home_blocked_0_points: 1.0,     // They re-enter easily
  my_home_blocked_1_point: 1.2,
  my_home_blocked_2_points: 1.5,
  my_home_blocked_3_points: 2.0,
  my_home_blocked_4_points: 3.5,     // They're stuck
  my_home_blocked_5_points: 6.0      // They're fucked
}
```

**If I have 4+ points blocked in MY home?**

- Hitting them → they're stuck on bar
- Hit value goes from 80 → 280+
- Worth taking risks to hit them

**The Strategic Implication**

This creates a feedback loop:

- "I need to build my home board so when I hit them, they're stuck"
- "They have a strong home board - I REALLY don't want to get hit"

```
function evaluateBlotRisk(move, board) {
  const hit_prob = calculateHitProbability(move.position, board.opponent)
  
  const recovery_prob = calculateReEntryProbability(board.opponent_home)
  const expected_lost_turns = (1 / recovery_prob) - 1
  
  const punishment = BASE_HIT_COST 
                   + (expected_lost_turns * TURN_VALUE)
                   + (position_depth_penalty)
  
  return hit_prob * punishment
}

function evaluateHitOpponent(move, board) {
  const hit_value = BASE_HIT_REWARD
  
  const opponent_recovery_prob = calculateReEntryProbability(board.my_home)
  const opponent_lost_turns = (1 / opponent_recovery_prob) - 1
  
  const bonus = opponent_lost_turns * TURN_VALUE
  
  return hit_value + bonus
}
```

### 3. Counter-Probability (our second calculation)

```
If I DO get hit:
- Probability I re-enter from bar: calculate based on their home board
  - 6 open points = 36/36 = 100% re-entry
  - 3 open points = 27/36 = 75% re-entry
  - 1 open point = 11/36 = 31% re-entry

- Probability I can then make a safe play: calculate legal moves

Expected_recovery_time = (turns_to_re-enter) + (turns_to_safety)
```

### 4. Dynamic Strategy Adjustment (context-aware)

Scope to define some constants:

```javascript
PROGRESSION = {
  OPENING: 0,
  CONTACT: 1,
  RACING: 2,
  BEAR_OFF: 3,
}
THREATS = {
  WEAK: 0,
  ESCAPING: 1,
  STRONG: 2,
}
```

```
Assess game context every move:

context = {
  phase: analyze_phase(board),            // OPENING, CONTACT, RACING, BEAR_OFF
  my_structure: assess_position(me),      // STRONG, WEAK, ESCAPING
  their_structure: assess_position(them), // STRONG, WEAK, ESCAPING
  momentum: compare_positions()           // 'winning' (1?), 'losing' (-1?), 'even' (0?)
}

Then adjust scoring weights:

if (context.phase === 'racing') {
  weights.hit_opponent = 20      // Not worth slowing down
  weights.advance = 100          // Just run home
}

if (context.their_structure === 'prime_threat' && context.my_structure === 'escaping') {
  weights.escape_before_trapped = 200  // CRITICAL
  weights.risk_tolerance = 0.4         // Take more risks to escape
}

if (context.momentum === 'losing') {
  weights.hit_opponent = 150     // Need to disrupt them
  weights.risk_tolerance = 0.6   // More aggressive
}
```

### Difficulty Levels (This is the Key)

**Easy AI:**

- Ignores probability calculations (acts like they don't exist)
- OR: Calculates probabilities but heavily discounts them
- Makes "obvious" mistakes: leaves blots unnecessarily
- Doesn't adjust strategy based on context

**Medium AI:**

- Calculates probabilities correctly
- Basic context awareness (racing vs contact)
- Sometimes makes risky plays

**Hard AI:**

- Full probability calculations
- Full dynamic strategy adjustment
- Always picks mathematically best move
- Adjusts aggressiveness based on game state
