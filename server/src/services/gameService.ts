import { initDecks, roleDeck, characterDeck } from "./deckService";
import { game } from "../entities/game";
import { getRandomInt } from "./utils";
import { Player } from "../entities/player";
import { RoleShogun } from "./constants";

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

const initPositions = function (ps: Array<Player>) {
  const positions = Array.from(new Array(ps.length), (x, i) => i);
  const shuffleCnt = getRandomInt(0, positions.length - 1);
  for (let i = 0; i < shuffleCnt; i++) {
    const rndNo = getRandomInt(0, positions.length - 1);
    const position = positions[i];
    positions[i] = positions[rndNo];
    positions[rndNo] = position;
  }

  for (let i = 0; i < positions.length; i++) {
    ps[i].position = positions[i];
  }

  //Shogun always first
  const shogun = getShogun();
  const first = ps.find(p => p.position == 0);

  first.position = shogun.position;
  shogun.position = 0;
};

const initHonorPoints = function () {

  const ps = game.players;
  const otherHP = ps.length < 6 ? 3 : 4;
  ps.forEach(p => p.honorPoints = otherHP);

  //Override for the shogun
  const shogun = getShogun();
  shogun.honorPoints = 5;
};

export const newGame = function () {

  const ps = game.players;

  initDecks(ps.length);

  ps.forEach(p => {
    p.role = roleDeck.draw();
    p.character = characterDeck.draw();
    p.reset();
  });

  initHonorPoints();

  initPositions(ps);

  giveHands();

  game.start();
};

export const endTurn = function (): Player {
  return game.nextPlayer();
};