import Vue from "vue";
import Vuex from "vuex";
import { Game } from '@shared/entities/game';

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
    game(state, val) {
      state.game = val;

      if (state.game.ended) {
        alert("The game has ended. Someone lost all his honor!!!");
      }
    }
  },
  getters: {
    username: state => {
      return state.username;
    }
  }
});
