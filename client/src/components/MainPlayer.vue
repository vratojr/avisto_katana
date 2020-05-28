<template>
  <v-row v-if="player" class="section" :class="{'current_player':isCurrentPlayer}">
    <v-col>
      <div class="title text-center fullwidth">{{player.id}}</div>
      <v-row class="justify-center">
        <Card :src="roleImgUrl" size="normal" />
        <Card :src="characterImgUrl" size="normal" />
        <Points :player="player" :editable="true" />
      </v-row>
      <div class="title text-center fullwidth">Hand</div>
      <v-row class="justify-center">
        <template v-for="(card,i) in player.hand">
          <Card :key="i" :src="getCardUrl(card)" size="normal" @click="playCard(i)" @contextmenu.native.prevent="discardCardFromHand(i)" />
        </template>
      </v-row>
      <div class="title text-center fullwidth">Game</div>
      <v-row class="justify-center">
        <Card v-for="(card,i) in player.game" :key="i" :src="getCardUrl(card)" size="normal" @click="discardCardFromGame(i)" />
      </v-row>
      <v-row class="justify-space-between ml-1 mr-1">
        <v-btn @click="endTurn()">End Turn</v-btn>
        <v-btn @click="suffleHand()">Suffle Hand</v-btn>
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
  mixins: [PlayerMixin],
  components: {
    Card,
    Points
  },
});
</script>

<style>
.owner_player {
  background-color: #26c6da;
}
</style>
