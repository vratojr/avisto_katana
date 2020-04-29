<template>
  <div class="content-wrapper">
    <v-row>
      <div class="d-flex flex-column flex-grow-0 justify-center p-l-1">
        <GameBoard :game="game" />
      </div>
      <v-col class="flex-grow-1">
        <div class="d-flex flex-column players_list">
          <div v-for="p in players" :key="p.id" class>
            <Player v-if="!p.isOwnerPlayer" :player="p" />
            <MainPlayer v-else :player="p" />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import Player from "../components/Player";
import GameBoard from "../components/GameBoard";
import MainPlayer from "../components/MainPlayer";

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
      },
      currentPlayer: {}
    },
    interval: {}
  }),
  mounted() {
    this.interval = setInterval(this.update, 500);
  },
  computed: {
    isOwner() {
      return this.game.players.find(p => p.id == this.$store.getters.username) != null
    },
    players() {
      if (this.game.players.length == 0) {
        return [];
      }

      let vm = this;
      //Enrich with some data
      let res = this.game.players.map(p => {
        return {
          ...p,
          isCurrentPlayer: vm.game.currentPlayer.id == p.id,
          // If the player corresponds to the current user
          isOwnerPlayer: p.id == this.$store.getters.username
        };
      });

      // rotate the player list so that the owner player is at the center
      const centerPos = Math.floor(res.length / 2);
      let ownerPlayerPos = res.findIndex(
        p => p.id == this.$store.getters.username
      );
      while (centerPos != ownerPlayerPos && ownerPlayerPos >= 0) {
        if (ownerPlayerPos > centerPos) {
          res.push(res.shift());
        } else {
          res.unshift(res.pop());
        }
        ownerPlayerPos = res.findIndex(
          p => p.id == this.$store.getters.username
        );
      }

      return res;
    }
  },
  methods: {
    async update() {
      let res = await axios.get("/api/game");
      Object.assign(this.game, res.data ? res.data : {});
      if (this.game.ended) {
        alert("The game has ended. Someone lost all his honor!!!")
        clearInterval(this.interval);// Brutal. The game won't then restart correctly
      }
    }
  }
};
</script>

<style>
.d-flex {
  display: flex;
}
</style>