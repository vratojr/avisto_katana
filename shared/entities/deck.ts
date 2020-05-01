import { getRandomInt } from "../utils/utils";
import { Card, GameCard, CharacterCard } from  "./card";
export class Deck {
  cards: Array<Card>
  cardTemplates: Map<Card, number>

  constructor(cardTypes: Map<Card, number>) {
    this.cardTemplates = cardTypes;
    this.reset();
  };

  empty() {
    this.cards = new Array<Card>();
  }

  reset() {
    this.cards = new Array<Card>();
    this.cardTemplates.forEach((n, t) => {
      for (let i = 0; i < n; i++) {
        this.cards.push(t.clone());
      }
    });
    this.shuffle();
  }

  shuffle() {
    if (this.cards.length == 0) {
      return;
    }
    const shuffleCnt = getRandomInt(this.cards.length / 2, this.cards.length - 1);
    for (let i = 0; i < shuffleCnt; i++) {
      const rndNo = getRandomInt(0, this.cards.length - 1);
      const card = this.cards[i];
      this.cards[i] = this.cards[rndNo];
      this.cards[rndNo] = card;
    }
  }

  draw(): Card {
    if (this.cards.length == 0) {
      return null;
    }
    return this.cards.splice(0, 1)[0];
  }

  drawLast(): Card {
    if (this.cards.length == 0) {
      return null;
    }
    return this.cards.splice(this.cards.length - 1, 1)[0];
  }
  add(card: Card) {
    this.cards.push(card);
  }
  isEmpty(): boolean {
    return this.cards.length == 0;
  }
}

export class GameDeck extends Deck {
  cards: Array<GameCard>
  cardTemplates: Map<GameCard, number>

  empty() {
    this.cards = new Array<GameCard>();
  }

  draw(): GameCard {
    if (this.cards.length == 0) {
      return null;
    }
    return this.cards.splice(0, 1)[0]; //TODO call super somehow and cast
  }

  drawLast(): GameCard {
    if (this.cards.length == 0) {
      return null;
    }
    return this.cards.splice(this.cards.length - 1, 1)[0]; //TODO call super somehow and cast
  }
}

export class CharacterDeck extends Deck {
  cards: Array<CharacterCard>
  cardTemplates: Map<CharacterCard, number>

  draw(): CharacterCard {
    return this.cards.splice(0, 1)[0]; //TODO call super somehow and cast
  }
}