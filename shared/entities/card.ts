
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