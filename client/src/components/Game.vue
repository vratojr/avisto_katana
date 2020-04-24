<template>
  <div class="content-wrapper">
    <v-row>
      <v-col cols="3">
        <GameBoard :game="game" />
      </v-col>
      <v-col cols="9">
        <div class="d-flex d-flex-direction-col d-flex-1 players_list">
          <div v-for="p in game.players" :key="p.id" class>
            <!-- <MainPlayer :player="p" :game="game" /> -->
            <Player :player="p" :game="game" />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <MainPlayer :player="mainPlayer" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import Player from "../components/Player";
import GameBoard from "../components/GameBoard";
import MainPlayer from "../components/MainPlayer";
//import * as entityService from '../services/entityService'

export default {
  components: {
    Player,
    GameBoard,
    MainPlayer
  },
  data: () => ({
    game: {
      players: [],
      gameDeck: {
        cards: []
      },
      discardedGameDeck: {
        cards: []
      }
    }
  }),
  mounted() {
    setInterval(this.update, 1000);
  },
  computed: {
    isOwner() {
      return this.game.players.find(player => {
        // console.log(this.$store.getters.username);
        return player.id == this.$store.getters.username;
      });
    },
    mainPlayer() {
      return this.isOwner ? this.isOwner : null;//entityService.createDefaultPlayer()
    }
  },
  methods: {
    async update() {
      let res = await axios.get("/api/game");
      Object.assign(this.game, res.data ? res.data : {});
    },
  }
};
</script>

<style>
.d-flex {
  display: flex;
}
</style>