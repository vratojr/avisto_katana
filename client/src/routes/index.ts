import Vue from "vue";
import VueRouter, { RouteConfig, NavigationGuard } from "vue-router";
import Login from "@/components/Login.vue";
import Game from "@/components/Game.vue";
import Home from "@/components/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const checkLogin: NavigationGuard = function(_to, _from, next) {
  console.log("user:" + store.getters.username);
  if (!store.getters.username) {
    next({ name: "login" });
  }
  else {
    next();
  }
};

const routes: Array<RouteConfig> = [
  { path: "/", name: "home", component: Home, beforeEnter: checkLogin },
  { path: "/game", name: "game", component: Game, beforeEnter: checkLogin },
  { path: "/login", name: "login", component: Login },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = new VueRouter({
  routes // short for `routes: routes`
});
