import store from "../store"
import Vue from "vue"
import { Action, PlayerAction, ActionType, CardAction, QuantityAction } from "@shared/websockets/message"

export const addPlayer = function (name: string) {
  Vue.prototype.$socket.sendObj(new PlayerAction(ActionType.AddPlayer, name))
  return Promise.resolve();
}

export const newGame = function () {
  Vue.prototype.$socket.sendObj(new Action(ActionType.NewGame))
  store.commit("newGame")
}

export const drawDiscarded = function () {
  Vue.prototype.$socket.sendObj(new PlayerAction(ActionType.DrawDiscardedCard, store.getters.username))
}

export const drawGameCard = function () {
  Vue.prototype.$socket.sendObj(new PlayerAction(ActionType.DrawGameCard, store.getters.username))
}

export const playCard = function (index: number) {
  Vue.prototype.$socket.sendObj(new CardAction(ActionType.PlayCard, store.getters.username, index))
}

export const discardCardFromHand = function (index: number) {
  Vue.prototype.$socket.sendObj(new CardAction(ActionType.DiscardCardFromHand, store.getters.username, index))
}

export const discardCardFromGame = function (index: number) {
  Vue.prototype.$socket.sendObj(new CardAction(ActionType.DiscardCardFromGame, store.getters.username, index))
}

export const alterLifePoints = function (quantity: number) {
  Vue.prototype.$socket.sendObj(new QuantityAction(ActionType.AddLifePoints, store.getters.username, quantity))
}

export const alterHonorPoints = function (quantity: number) {
  Vue.prototype.$socket.sendObj(new QuantityAction(ActionType.AddHonorPoints, store.getters.username, quantity))
}

export const endTurn = function () {
  Vue.prototype.$socket.sendObj(new PlayerAction(ActionType.EndTurn, store.getters.username))
}