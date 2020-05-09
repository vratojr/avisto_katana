import { game } from "@shared/entities/game";
import { Player } from "@shared/entities/player";
import { RoleShogun } from "./constants";
import * as initDeckService from "./initDecksService";

const getShogun = function () {
  return game.players.find(p => p.role.cardName == RoleShogun);
};

const giveHands = function () {

  const ps = game.orderedPlayers();

  Array.from(Array(4)).forEach(() => ps[0].hand.push(game.gameDeck.draw()));

  for (let i = 1; i < ps.length; i++) {
    if (i == 1 || i == 2) {
      Array.from(Array(5)).forEach(() => ps[i].hand.push(game.gameDeck.draw()));
    }
    else if (i == 3 || i == 4) {
      Array.from(Array(6)).forEach(() => ps[i].hand.push(game.gameDeck.draw()));
    }
    else if (i == 5 || i == 6) {
      Array.from(Array(7)).forEach(() => ps[i].hand.push(game.gameDeck.draw()));
    }
  }

};

// Rotate the positions until the shogun is the first
const initPositions = function (ps: Array<Player>) {

  //Shogun always first
  let shogun = getShogun();
  while (shogun.position > 0) {
    ps.forEach(p => {
      if (p.position < ps.length - 1) {
        p.position++;
      }
      else {
        p.position = 0;
      }
    });
    shogun = getShogun();
  }

};

const initHonorPoints = function () {

  const ps = game.players;
  const otherHP = ps.length < 6 ? 3 : 4;
  ps.forEach(p => p.honorPoints = otherHP);

  //Override for the shogun
  const shogun = getShogun();
  shogun.honorPoints = 5;
};

const initRoles = function () {

  game.players.forEach(p => {
    p.role = game.roleDeck.draw();
    p.character = game.characterDeck.draw();
    p.reset();
  });

};

export const addPlayer = function (id: string): Player {
  const players = game.players;
  let player = players.find(p => p.id == id);
  if (!player) {
    player = new Player(id, players.length);
    players.push(player);
  }
  return player;
};

export const initGame = function () {

  game.reset();

  const ps = game.players;

  initDeckService.initDecks(ps.length);

  initRoles();

  initHonorPoints();

  initPositions(ps);

  giveHands();

  game.start();
};


