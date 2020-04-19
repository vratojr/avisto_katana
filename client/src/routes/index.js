import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Game from '../components/Game'
import Home from '../components/Home'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home, beforeEnter: checkLogin },
  { path: '/game', name: 'game', component: Game, beforeEnter: checkLogin },
  { path: '/login', name: 'login', component: Login },
]

function checkLogin(to, from, next) {
  console.log("user:" + store.getters.username)
  if (!store.getters.username) {
    next({ name: 'login' })
  }
  else {
    next()
  }
}

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = new VueRouter({
  routes // short for `routes: routes`
})
