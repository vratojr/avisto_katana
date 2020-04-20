import { Player } from "../entities/player";
import { GameDeck, GameCard } from "./deck";
export class Game {
  currentPlayer: Player

  players: Array<Player> = new Array<Player>();

  started: boolean

  ended: boolean

  gameDeck: GameDeck;

  discardedGameDeck = new GameDeck(new Map<GameCard, number>());

  orderedPlayers() {
    return this.players.sort((a, b) => a.position - b.position);
  }

  nextPlayer(): Player {
    let currIndex = 0;
    if (this.currentPlayer) {
      currIndex = this.orderedPlayers().indexOf(this.currentPlayer);
    }

    if (currIndex == this.players.length - 1) {
      currIndex = 0;
    }
    else {
      currIndex++;
    }
    this.currentPlayer = this.orderedPlayers()[currIndex];
    return this.currentPlayer;
  }

  start() {
    this.started = true;
    this.ended = false;
    this.nextPlayer();
  }

  end() {
    this.started = true;
    this.ended = true;
  }

  reset() {
    this.started = false;
    this.ended = false;
  }
}

export const game = new Game();