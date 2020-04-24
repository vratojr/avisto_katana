
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

    //If not, shuffle the discarded into the game deck and restart
    game.gameDeck = game.discardedGameDeck;
    game.discardedGameDeck.empty();
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

export const drawCard = function (id: string): Player {
  const player = players.find(p => p.id == id);
  const card = drawGameCard();
  card && player.hand.push(card);
  return player;
};

export const drawDiscarded = function (id: string): Player {
  const player = players.find(p => p.id == id);
  const card = game.discardedGameDeck.drawLast();
  player.hand.push(card);
  return player;
};

export const playCard = function (id: string, pos: number): Card {
  const player = players.find(p => p.id == id);
  const card = player.playCard(pos);
  if (card && card.cardType != CardType.Permanent) {
    game.discardedGameDeck.add(card);
  }
  return card;
};

export const discardCard = function (id: string, pos: number): Card {
  const player = players.find(p => p.id == id);
  const card = player.removeCardFromGame(pos);
  game.discardedGameDeck.add(card);

  return card;
};