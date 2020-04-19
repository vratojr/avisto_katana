import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    login (state,val) {
      state.username = val
    }
  },
  getters: {
    username: state => {
      return state.username
    }
  }
})