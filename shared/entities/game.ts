import { Player } from "../entities/player";
import { GameDeck, Deck, CharacterDeck } from "./deck";
import { GameCard, Card, CharacterCard } from "./card";
import { JsonProperty, Serializable } from 'typescript-json-serializer';

export enum GameState {
  Stopped,
  Started,
  Ended
}

@Serializable()
export class Game {

  @JsonProperty()
  currentPlayer: Player

  @JsonProperty()
  players: Array<Player> = new Array<Player>();

  @JsonProperty()
  state: GameState = GameState.Stopped;

  @JsonProperty()
  gameDeck: GameDeck = new GameDeck(new Map<GameCard, number>());

  @JsonProperty()
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
    this.state = GameState.Started
    this.nextPlayer();
  }

  end() {
    this.state = GameState.Ended;
  }

  reset() {
    this.state = GameState.Stopped;
    this.currentPlayer = null;
  }
}

export const game = new Game();