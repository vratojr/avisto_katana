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
import axios from "axios";

export default Vue.extend({
  data() {
    return {
      game: {
        players: []
      },
      interval: null
    };
  },
  computed: {
    isAdmin() {
      return this.game.players.find(p => p.id.toLowerCase() === "simone");
    }
  },
  mounted() {
    this.interval = setInterval(this.update, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    async update() {
      this.updateGame(await axios.get("/api/game"));
    },
    newGame() {
      this.updateGame(axios.post("/api/admin/newGame"));
    },
    updateGame(res) {
      Object.assign(this.game, res.data ? res.data : {});
      if (this.game.started) {
        this.$router.push("/game");
      }
    }
  }
});
</script>
