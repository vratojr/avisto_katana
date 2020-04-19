<template>
  <div>
    <div>Waiting for the game to begin. Connected players {{game.players.length}}</div>
    <div v-if="isAdmin">
      <v-btn @click="newGame">New Game</v-btn>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      game: {
        players: []
      },
      interval: null
    }
  },
  computed: {
    isAdmin() {
      return this.game.players.find(p => p.id.toLowerCase() == "simone")
    }
  },
  mounted() {
    this.interval = setInterval(this.update, 1000)
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    async update() {
      this.updateGame(await axios.get('/api/game'))

    },
    newGame() {
      this.updateGame(axios.post('/api/admin/newGame'))
    },
    updateGame(res) {
      Object.assign(this.game, res.data ? res.data : {});
      if (this.game.started) {
        this.$router.push("/game");
      }
    }
  }
}
</script>

<style>
</style>