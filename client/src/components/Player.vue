<template>
  <v-row v-if="player" class="section" :class="{'current_player':isCurrentPlayer,'owner_player':isOwnerPlayer}">
    <v-col>
      <div class="title text-center fullwidth">{{player.id}}</div>
      <v-row class="justify-center">
        <Card v-if="isShogun" :src="roleImgUrl" size="normal" />
        <Card v-else :src="require('../assets/roles/role_back.png')" size="normal" />
        <Card :src="characterImgUrl" size="normal" />
        <Points :player="player" />
        <div class="d-flex card-holder normal align-center">
          <v-img class="small" :src="require(`../assets/game/game_back.png`)" />
          <span>X{{player.hand.length}}</span>
        </div>
        <div class="title text-center fullwidth">Game</div>
        <Card v-for="(card,i) in player.game" :key="i" :src="getCardUrl(card)" size="normal" @click="discardCardFromGame(i)" />
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Card from "./Card.vue";
import Points from "./Points.vue";
import PlayerMixin from "./PlayerMixin";
import Vue from "vue";

export default Vue.extend({
  components: {
    Card,
    Points
  },
  mixins: [PlayerMixin]
});
</script>

<style>
.player {
  padding: 1rem;
}
</style>
