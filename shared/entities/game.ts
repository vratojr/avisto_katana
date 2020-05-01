import { Player } from "../entities/player";
import { GameDeck, Deck, CharacterDeck } from "./deck";
import { GameCard, Card, CharacterCard } from "./card";
export class Game {
  currentPlayer: Player

  players: Array<Player> = new Array<Player>();

  started: boolean

  ended: boolean

  gameDeck: GameDeck = new GameDeck(new Map<GameCard, number>());

  discardedGameDeck = new GameDeck(new Map<GameCard, number>());

  roleDeck: Deck = new Deck(new Map<Card, number>());
  characterDeck: CharacterDeck = new CharacterDeck(new Map<CharacterCard, number>());

  orderedPlayers() {
    return this.players.sort((a, b) => a.position - b.position);
  }

  decks() {
    return [this.roleDeck, this.gameDeck, this.characterDeck];
  }

  nextPlayer(): Player {
    let currIndex = -1;
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
    this.currentPlayer = null;
  }
}

export const game = new Game();