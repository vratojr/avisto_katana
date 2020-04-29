import * as initGameService from "./initGameService";
import { game } from "../entities/game";

export const add5Players = function () {
  ["Simone", "Hannah", "Chiara", "Alice", "Alberto"].forEach(n => {
    initGameService.addPlayer(n);
  });
};

export const emptyGameDeck = function () {
  game.gameDeck.cards.splice(0, game.gameDeck.cards.length - 2);  
};
