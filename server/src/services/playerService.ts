
import { Player } from "../entities/player";
import { Card, CardType } from "../entities/deck";
import { game } from "../entities/game";
import * as deckService from "./deckService";

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
  const card = game.gameDeck.draw();
  player.hand.push(card);
  return player;
};

export const playCard = function (id: string, pos: number): Card {
  const player = players.find(p => p.id == id);
  const card = player.playCard(pos);
  if (card.cardType != CardType.Permanent) {
    deckService.discardGameCard(card);
  }
  return card;
};
