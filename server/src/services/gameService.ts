
import { Player } from "../entities/player";
import { Card, CardType, GameCard } from "../entities/card";
import { game } from "../entities/game";

const players = game.players;

const drawGameCard = function (): GameCard {
  const card = game.gameDeck.draw();
  if (game.gameDeck.isEmpty()) {
    // If card is null we are at the end of the deck.
    // Remove 1 honorpoint from each player and check if someone is at zero

    for (let i = 0; i < game.players.length; i++) {
      const p = game.players[i];
      p.honorPoints--;
      if (p.honorPoints == 0) {
        game.end();
        return null;
      }
    }

    //If not, swap the decks, shuffle and restart
    [game.gameDeck, game.discardedGameDeck] = [game.discardedGameDeck, game.gameDeck];
    game.gameDeck.shuffle();
  }
  return card;
};

export const endTurn = function (): Player {
  return game.nextPlayer();
};

export const getPlayer = function (id: string): Player {
  return players.find(p => p.id == id);
};

export const drawCard = function (playerId: string): Player {
  const player = players.find(p => p.id == playerId);
  const card = drawGameCard();
  card && player.hand.push(card);
  return player;
};

export const drawDiscarded = function (playerId: string): Player {
  const player = players.find(p => p.id == playerId);
  const card = game.discardedGameDeck.drawLast();
  player.hand.push(card);
  return player;
};

export const playCard = function (playerId: string, pos: number): Card {
  const player = players.find(p => p.id == playerId);
  const card = player.playCard(pos);
  if (card && card.cardType != CardType.Permanent) {
    game.discardedGameDeck.add(card);
  }
  return card;
};

export const discardCard = function (playerId: string, pos: number): Card {
  const player = players.find(p => p.id == playerId);
  const card = player.removeCardFromGame(pos);
  game.discardedGameDeck.add(card);

  return card;
};

export const addHonorPoints = function (playerId: string, quantity: number): Player {
  const player = players.find(p => p.id == playerId);
  player.honorPoints += (quantity);
  return player;
};

export const addLifePoints = function (playerId: string, quantity: number): Player {
  const player = players.find(p => p.id == playerId);
  player.incrementLifePoints(quantity);
  return player;
};