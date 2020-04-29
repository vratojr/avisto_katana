import { Card, GameCard, CharacterCard, CardType } from "./card";

export class Player {
  id: string;
  role: Card;

  private _character: CharacterCard;
  get character(): CharacterCard {
    return this._character;
  }
  set character(value: CharacterCard) {
    this._character = value;
    this.initLifePoints(value.lifePoints);
  }
  hand: Array<GameCard> = new Array<GameCard>();

  game: Array<GameCard> = new Array<GameCard>();

  position: number;
  honorPoints: number;

  private _lifePoints: number;

  private maxLifePoints: number;

  constructor(id: string, position: number) {
    this.id = id;
    this.position = position;
  }

  get honolifePointsrPoints(): number {
    return this._lifePoints;
  }
  initLifePoints(value: number) {
    this._lifePoints = value;
    this.maxLifePoints = value;
  }

  incrementLifePoints(value: number): boolean {
    if (this._lifePoints + value > this.maxLifePoints) {
      return false;
    }
    this._lifePoints += value;
  }
  reset() {
    this.hand = new Array<GameCard>();
    this.game = new Array<GameCard>();
  }

  playCard(pos: number): GameCard {
    if (pos > this.hand.length - 1) {
      return null;
    }

    const card = this.hand.splice(pos, 1)[0];
    if (card.cardType == CardType.Permanent) {
      this.game.push(card);
    }
    return card;
  }

  removeCardFromGame(pos: number): GameCard {
    if (pos > this.game.length - 1) {
      return null;
    }

    return this.game.splice(pos, 1)[0];
  }


}