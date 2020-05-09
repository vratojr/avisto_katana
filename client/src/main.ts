import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { router } from "./routes";
import store from "./store";
import Vuex from "vuex";
require("./scss/main.scss");

import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, `ws://${window.location.hostname}:3000`, {
  reconnection: true,
  store: store,
  format: 'json'
})

Vue.use(Vuex);
Vue.config.productionTip = false;

Vue.use(vuetify, {
  iconfont: "fa"
});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount("#app");
