import Vue from "vue";
import Vuex from "vuex";
import { Game, GameState } from '@shared/entities/game';
import { router } from "../routes"
import { deserialize } from 'typescript-json-serializer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    game: new Game()
  },
  mutations: {
    login(state, val) {
      state.username = val;
    },
    SOCKET_ONMESSAGE(state, payload: Game) {

      if (state.game.state === GameState.Stopped && payload.state === GameState.Started) {
        router.push("/game");
      }

      state.game = deserialize<Game>(payload, Game)

      if (state.game.state === GameState.Ended) {
        alert("The game has ended. Someone lost all his honor!!!");
      }
    },
    newGame(state) {
      state.game = new Game()
    }
  },
  getters: {
    username: state => {
      return state.username;
    }
  }
});
