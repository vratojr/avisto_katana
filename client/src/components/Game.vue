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

<script lang="ts">
import Vue from "vue";
import Player from "@/components/Player.vue";
import GameBoard from "@/components/GameBoard.vue";
import MainPlayer from "@/components/MainPlayer.vue";
import { Game } from "@shared/entities/game";

export default Vue.extend({
  components: {
    Player,
    GameBoard,
    MainPlayer
  },
  computed: {
    game() {
      return this.$store.state.game;
    },
    isOwner() {
      return (
        this.game.players.find(p => p.id === this.$store.getters.username) !=
        null
      );
    },
    players() {
      if (this.game.players.length === 0) {
        return [];
      }

      // Enrich with some data
      const res = this.game.players.map(p => {
        return {
          ...p,
          isCurrentPlayer: this.game.currentPlayer.id === p.id,
          // If the player corresponds to the current user
          isOwnerPlayer: p.id === this.$store.getters.username
        };
      });

      // rotate the player list so that the owner player is at the center
      const centerPos = Math.floor(res.length / 2);
      let ownerPlayerPos = res.findIndex(
        p => p.id === this.$store.getters.username
      );
      while (centerPos !== ownerPlayerPos && ownerPlayerPos >= 0) {
        if (ownerPlayerPos > centerPos) {
          res.push(res.shift());
        } else {
          res.unshift(res.pop());
        }
        ownerPlayerPos = res.findIndex(
          p => p.id === this.$store.getters.username
        );
      }

      return res;
    }
  }
});
</script>

<style>
.d-flex {
  display: flex;
}
</style>
