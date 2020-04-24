
import { Player } from "../entities/player";
import { Card, CardType } from "../entities/card";
import { game } from "../entities/game";
import * as gameService from "./gameService";

const players = game.players;

export const add = function (id: string): Player {
  let player = players.find(p => p.id == id);
  if (!player) {
    players.push(new Player(id));
    player = players[players.length - 1];
  }
  return player;
};

export const setRoleCard = function (id: string, role: Card): Player {
  const player = players.find(p => p.id == id);
  player.role = role;
  return player;
};

export const getPlayer = function (id: string): Player {
  return players.find(p => p.id == id);
};

export const drawCard = function (id: string): Player {
  const player = players.find(p => p.id == id);
  const card = gameService.drawGameCard();
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