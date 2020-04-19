<template>
  <div class="d-flex">
    <div>
      <GameBoard :game="game" />
    </div>
    <div class="d-flex d-flex-direction-col">
      <div v-for="p in game.players" :key="p.id" class>
        <MainPlayer :player="p" :game="game" />
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import MainPlayer from '../components/MainPlayer'
import GameBoard from '../components/GameBoard'

export default {
  components: {
    MainPlayer,
    GameBoard
  },
  data: () => ({
    game: {
      players: [],
      discardedGameDeck: {
        cards: []
      }
    }
  }),
  mounted() {
    setInterval(this.update, 1000)
  },
  methods: {
    async update() {
      let res = await axios.get('/api/game')
      Object.assign(this.game, res.data ? res.data : {});
    }
  }
}
</script>

<style>
.d-flex {
  display: flex;
}
</style>