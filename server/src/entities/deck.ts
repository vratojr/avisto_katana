import { getRandomInt } from "../services/utils";

export enum CardType {
  // The names are mapped to folder in the UI. BEWARE!
  Weapon = "weapon",
  Permanent = "permanent",
  Action = "action"
}
export class Card {
  cardName: string;

  constructor(cardName?: string) {
    this.cardName = cardName || "";
  };

  clone(card?: Card): Card {
    if (!card) {
      card = new Card();
    }
    card.cardName = this.cardName;
    return card;
  };
};

export class CharacterCard extends Card {

  lifePoints: number = 0;
  constructor(cardName?: string, lifePoints?: number) {
    super(cardName);
    this.lifePoints = lifePoints || 0;
  };

  clone(card?: Card): Card {
    if (!card) {
      card = new CharacterCard();
    }
    super.clone(card);
    if (card instanceof CharacterCard) {
      card.lifePoints = this.lifePoints;
    }
    return card;
  };
}

export class GameCard extends Card {

  cardType: CardType
  constructor(cardName?: string, cardType?: CardType) {
    super(cardName);
    this.cardType = cardType || null;
  };

  clone(card?: Card): Card {
    if (!card) {
      card = new GameCard();
    }
    super.clone(card);
    if (card instanceof GameCard) {
      card.cardType = this.cardType || null;
    }
    return card;
  };
}

export class WeaponCard extends GameCard {

  range: number

  strength: number

  constructor(cardName?: string, cardType?: CardType, range?: number, strength?: number) {
    super(cardName, cardType);
    this.range = range || 0;
    this.strength = strength || 0;
  };

  clone(card?: Card): Card {
    if (!card) {
      card = new WeaponCard();
    }
    super.clone(card);
    if (card instanceof WeaponCard) {
      card.range = this.range;
      card.strength = this.strength;
    }
    return card;
  };

}

export class Deck {
  cards: Array<Card>
  cardTemplates: Map<Card, number>

  constructor(cardTypes: Map<Card, number>) {
    this.cardTemplates = cardTypes;
    this.reset();
  };

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
    const shuffleCnt = getRandomInt(2, this.cards.length - 1);
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
    return this.cards.splice(this.cards.length-1, 1)[0];
  }
  add(card: Card) {
    this.cards.push(card);
  }
}

export class GameDeck extends Deck {
  cards: Array<GameCard>
  cardTemplates: Map<GameCard, number>

  draw(): GameCard {
    return this.cards.splice(0, 1)[0]; //TODO call super somehow and cast
  }

  drawLast(): GameCard {
    if (this.cards.length == 0) {
      return null;
    }
    return this.cards.splice(this.cards.length-1, 1)[0]; //TODO call super somehow and cast
  }
}

export class CharacterDeck extends Deck {
  cards: Array<CharacterCard>
  cardTemplates: Map<CharacterCard, number>

  draw(): CharacterCard {
    return this.cards.splice(0, 1)[0]; //TODO call super somehow and cast
  }
}