import { Card, GameCard, CharacterCard, CardType } from "./deck";
import { NumericDictionary } from "lodash";
import { game } from "./game";

export class Player {
  id: string;
  role: Card;

  private _character: CharacterCard;
  get character(): CharacterCard {
    return this._character;
  }
  set character(value: CharacterCard) {
    this._character = value;
    this.lifePoints = value.lifePoints;
  }
  hand: Array<GameCard> = new Array<GameCard>();

  game: Array<GameCard> = new Array<GameCard>();

  position: number;

  honorPoints: number;

  lifePoints: number;

  constructor(id: string) {
    this.id = id;
  }

  reset() {
    this.hand = new Array<GameCard>();
    this.game = new Array<GameCard>();
  }

  playCard(pos: number) {
    if (pos > this.hand.length - 1) {
      return;
    }

    const card = this.hand.splice(pos, 1)[0];
    if (card.cardType == CardType.Permanent) {
      this.game.push(card);
    }
    return card;
  }


}