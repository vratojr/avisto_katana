<template>
  <div id="wrapper">
    <v-app class="content-wrapper">
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <v-btn text @click="newGame">
            <span class="mr-2">New Game</span>
          </v-btn>
        </div>

        <v-spacer></v-spacer>

        <v-btn :href="manualUrl" target="_blank" text>
          <span class="mr-2">Manual</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-app-bar>

      <div class="content-wrapper">
        <router-view />
      </div>
    </v-app>
  </div>
</template>

<script>
import * as commService from "./services/commService";
import Vue from "vue";

export default Vue.extend({
  name: "App",
  computed: {
    manualUrl() {
      return "/manual.pdf";
    }
  },
  methods: {
    newGame() {
      axios.post("/api/admin/newGame");
    }
  }
});
</script>
