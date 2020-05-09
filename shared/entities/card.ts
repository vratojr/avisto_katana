import { JsonProperty, Serializable } from 'typescript-json-serializer';

export enum CardType {
  // The names are mapped to folder in the UI. BEWARE!
  Weapon = "weapon",
  Permanent = "permanent",
  Action = "action"
}

@Serializable()
export class Card {

  @JsonProperty()
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

@Serializable()
export class CharacterCard extends Card {

  @JsonProperty()
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

@Serializable()
export class GameCard extends Card {

  @JsonProperty()
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

@Serializable()
export class WeaponCard extends GameCard {

  @JsonProperty()
  range: number

  @JsonProperty()
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