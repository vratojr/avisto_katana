import axios from "axios"
import store from "../store"

export const addPlayer = function (name: string) {
  return axios.post("/api/players/add", { name: name })
}

export const newGame = function () {
  return axios.post("/api/admin/newGame")
}

export const updateGame = function () {
  return axios.get("/api/game")
}

export const drawDiscarded = function () {
  return axios.put(`api/players/${store.getters.username}/drawDiscarded`);
}

export const drawGameCard = function () {
  return axios.put(`api/players/${store.getters.username}/draw`);
}

export const playCard = function (index: number) {
  return axios.put(`api/players/${store.getters.username}/hand/${index}/play`);
}

export const discardCardFromGame = function (index: number) {
  return axios.put(`api/players/${store.getters.username}/game/${index}/discard`);
}

export const alterLifePoints = function (quantity: number) {
  axios.put(`api/players/${store.getters.username}/addLifePoints?quantity=${quantity}`);
}

export const alterHonorPoints = function (quantity: number) {
  axios.put(`api/players/${store.getters.username}/addHonorPoints?quantity=${quantity}`);
}

export const endTurn = function () {
  return axios.post("/api/game/endTurn");
}