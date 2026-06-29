# Ludo Game

A lightweight, purely browser-based Ludo game built using standard web technologies. This project focuses on building a strict, state-driven multiplayer board game engine using vanilla JavaScript, managing dynamic rule checks, player rotations, and edge-case multi-player configurations entirely on the client side.

## Core Features and Game Mechanics

### Player Management & Dynamic Color Allocation
* **Flexible Player Modes:** Supports 2, 3, or 4 active players.
* **Adaptive Color Assignment:** In 2-player and 3-player modes, the system automatically assigns distinct board colors to streamline the setup. In 4-player mode, players have the manual option to choose their preferred base color.
* **Turn Rotation Order:** The dice follows a deterministic rotation sequence based on the standard board layout: Blue → Yellow → Green → Red.

### Movement & Dice Rules
* **Token Activation:** Tokens are locked in their respective homes initially and can only be deployed onto the active track when a player rolls a 1 or a 6.
* **Streak Controls (Triple Six Rule):** Rolling a 6 grants an immediate extra turn. However, if a player rolls three consecutive 6s, the entire streak is invalidated, the move is blocked, and the turn automatically passes to the next player.
* **Bonus Turns:** Players are awarded an extra dice roll under two conditions:
    * Successfully capturing/killing an opponent's token.
    * Successfully navigating a token into the center 'Winner' zone.

### Win-State & Turn-Skip Logic
* **Won Player Exemption:** When a player successfully moves all their tokens into the winner zone, the game logic permanently flags them as finished. Their subsequent turns are automatically skipped in the rotation loop without breaking the sequence for the remaining players.
* **Dynamic Leaderboard Trigger:** The game dynamically evaluates the active match state. The moment $n-1$ players (where $n$ is the total number of players) finish the game, the loop terminates, and a final ranked leaderboard table is instantly rendered on screen.

## Technical Architecture

The architecture is built from scratch without external game engines, leveraging raw web technologies to manage complex board coordinates and turn-based states.

* **Frontend & Layout:** Semantic HTML5 structure with a custom CSS layout designed to mimic the exact geometry of a physical Ludo board, paired with responsive side-panels for active player profiles and live game logs.


## How to Run

Since the project relies completely on native browser APIs, there is no build step or package installation required.

1. Clone or download the repository files.
2. Open the `index.html` file directly in any modern web browser.
3. Select the number of players, configure colors, and start the match.