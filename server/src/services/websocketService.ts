import WebSocket from "ws";
import { parseAction, ActionType, CardAction, QuantityAction, PlayerAction } from "@shared/websockets/message"
import * as gameService from "../services/gameService";
import * as initGameService from "../services/initGameService";
import { game } from "@shared/entities/game";

let wss: WebSocket.Server = null;

const handleAction = function (data: any) {
  let action = parseAction(data)

  if (action.type == ActionType.NewGame) {
    initGameService.initGame();
    signalGameUpdated()
    return
  }

  let a = action as PlayerAction

  switch (a.type) {
    case ActionType.AddPlayer:
      initGameService.addPlayer(a.playerId);
      break;
    case ActionType.EndTurn:
      gameService.endTurn()
      break
    case ActionType.DrawDiscardedCard:
      gameService.drawDiscarded(a.playerId)
      break
    case ActionType.DrawGameCard:
      gameService.drawCard(a.playerId)
      break
    case ActionType.PlayCard:
      gameService.playCard(a.playerId, (a as CardAction).cardPosition)
      break
    case ActionType.DiscardCardFromGame:
      gameService.discardCard(a.playerId, (a as CardAction).cardPosition)
      break
    case ActionType.AddHonorPoints:
      gameService.addHonorPoints(a.playerId, (a as QuantityAction).quantity)
      break;
    case ActionType.AddLifePoints:
      gameService.addLifePoints(a.playerId, (a as QuantityAction).quantity)
      break
  }

  signalGameUpdated()

}

export const init = function () {

  wss = new WebSocket.Server({ port: 3000 });

  wss.on('connection', function connection(ws: any) {
    ws.on('message', function incoming(data: any) {
      handleAction(data);
    });
  });

}

export const signalGameUpdated = function () {
  wss.clients.forEach(function each(client: any) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(game));
    }
  });
}