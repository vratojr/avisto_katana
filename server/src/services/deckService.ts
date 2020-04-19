import { Card, GameCard, WeaponCard, CharacterCard, Deck, CharacterDeck, GameDeck, CardType } from "../entities/deck";
import { game } from "../entities/game";

export let roleDeck: Deck;
export let characterDeck: CharacterDeck;

const initRoles = function (players: number) {
  const RoleCards = new Map<Card, number>();
  RoleCards.set(new Card("shogun"), 1);

  switch (players) {
    case 4:
      RoleCards.set(new Card("samurai"), 1);
      RoleCards.set(new Card("ninja"), 2);
      break;
    case 5:
      RoleCards.set(new Card("samurai"), 1);
      RoleCards.set(new Card("ninja"), 1);
      RoleCards.set(new Card("ronin"), 1);
      break;
    case 6:
      RoleCards.set(new Card("samurai"), 1);
      RoleCards.set(new Card("ronin"), 1);
      RoleCards.set(new Card("ninja"), 3);
      break;
    case 7:
      RoleCards.set(new Card("samurai"), 2);
      RoleCards.set(new Card("ronin"), 1);
      RoleCards.set(new Card("ninja"), 3);
      break;
  }
  roleDeck = new Deck(RoleCards);
};

const initGameCards = function () {
  const GameCards = new Map<Card, number>();
  GameCards.set(new GameCard("attaque_rapide", CardType.Permanent), 3);
  GameCards.set(new GameCard("cerimonie_du_the", CardType.Action), 4);
  GameCards.set(new GameCard("code_du_bushido", CardType.Permanent), 2);
  GameCards.set(new GameCard("concentration", CardType.Permanent), 6);
  GameCards.set(new GameCard("armure", CardType.Permanent), 4);
  GameCards.set(new GameCard("cri_de_guerre", CardType.Action), 4);
  GameCards.set(new GameCard("daimyo", CardType.Action), 3);
  GameCards.set(new GameCard("diversion", CardType.Action), 5);
  GameCards.set(new GameCard("geisha", CardType.Action), 6);
  GameCards.set(new GameCard("meditation", CardType.Action), 3);
  GameCards.set(new GameCard("ju_jitsu", CardType.Action), 3);
  GameCards.set(new GameCard("parade", CardType.Action), 15);
  GameCards.set(new WeaponCard("bokken", CardType.Weapon, 1, 1), 6);
  GameCards.set(new WeaponCard("shuriken", CardType.Weapon, 3, 1), 3);
  GameCards.set(new WeaponCard("kusarigama", CardType.Weapon, 2, 2), 4);
  GameCards.set(new WeaponCard("kiseru", CardType.Weapon, 1, 2), 5);
  GameCards.set(new WeaponCard("bo", CardType.Weapon, 2, 1), 5);
  GameCards.set(new WeaponCard("daikyu", CardType.Weapon, 5, 2), 1);
  GameCards.set(new WeaponCard("katana", CardType.Weapon, 2, 3), 1);
  GameCards.set(new WeaponCard("naginata", CardType.Weapon, 4, 1), 2);
  GameCards.set(new WeaponCard("wakizashi", CardType.Weapon, 1, 3), 4);
  GameCards.set(new WeaponCard("nagayari", CardType.Weapon, 4, 2), 4);
  GameCards.set(new WeaponCard("nodachi", CardType.Weapon, 3, 3), 4);
  GameCards.set(new WeaponCard("kanabo", CardType.Weapon, 3, 2), 4);
  GameCards.set(new WeaponCard("tanegashima", CardType.Weapon, 5, 1), 4);

  game.gameDeck = new GameDeck(GameCards);
};

const initCharacterCards = function () {
  const CharCards = new Map<CharacterCard, number>();
  CharCards.set(new CharacterCard("nobunaga", 5), 1);
  CharCards.set(new CharacterCard("musashi", 5), 1);
  CharCards.set(new CharacterCard("hanzo", 4), 1);
  CharCards.set(new CharacterCard("goemon", 5), 1);
  CharCards.set(new CharacterCard("benkei", 5), 1);
  CharCards.set(new CharacterCard("ieyasu", 5), 1);
  CharCards.set(new CharacterCard("tomoe", 5), 1);
  CharCards.set(new CharacterCard("hideyoshi", 4), 1);
  CharCards.set(new CharacterCard("chiyome", 4), 1);
  CharCards.set(new CharacterCard("ginchiyo", 4), 1);
  CharCards.set(new CharacterCard("kojiro", 5), 1);
  CharCards.set(new CharacterCard("ushiwaka", 4), 1);

  characterDeck = new CharacterDeck(CharCards);
};

export const initDecks = function (players: number) {
  initRoles(players);

  initGameCards();

  initCharacterCards();

  [roleDeck, game.gameDeck, characterDeck].forEach(d => d.reset());
};

export const shuffle = function (deckId: string) {
  switch (deckId) {
    case "role":
      roleDeck.shuffle();
      break;
  }
  return true;
};

export const draw = function (deckId: string): Card {
  switch (deckId) {
    case "role":
      return roleDeck.draw();
  }
};

export const reset = function (deckId: string) {
  switch (deckId) {
    case "role":
      return roleDeck.reset();
  }
};

export const content = function (deckId: string): Array<Card> {
  switch (deckId) {
    case "role":
      return roleDeck.cards;
  }
};

export const discardGameCard = function (card: GameCard) {
  game.discardedGameDeck.add(card);
};