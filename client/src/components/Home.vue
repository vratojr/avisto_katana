<template>
  <div>
    <div>Waiting for the game to begin. Connected players:</div>
    <div v-for="p in game.players" :key="p.name">{{p.id}}</div>
    <div v-if="isAdmin">
      <v-btn @click="newGame">New Game</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as commService from "../services/commService";
import axios from "axios";

export default Vue.extend({
  computed: {
    game() {
      return this.$store.state.game;
    },
    isAdmin() {
      return this.game.players.find(p => p.id.toLowerCase() === "simone");
    }
  },
  mounted() {
    this.interval = setInterval(this.update, 1000);
  },
  methods: {
    async update() {
      this.updateGame(await commService.updateGame());
    },
    newGame() {
      this.updateGame(commService.newGame());
    },
    updateGame(res) {
      this.$store.commit("game", res.data);
      if (this.$store.state.game.started) {
        this.$router.push("/game");
      }
    }
  }
});
</script>
