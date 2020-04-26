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
          <Card :key="i" :src="getCardUrl(card)" size="normal" @click="playCard(i)" />
        </template>
      </v-row>
      <div class="title text-center fullwidth">Game</div>
      <v-row class="justify-center">
        <Card v-for="(card,i) in player.game" :key="i" :src="getCardUrl(card)" size="normal" @click="discardCardFromGame(i)" />
      </v-row>
      <v-btn @click="endTurn()">End Turn</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import Card from "./Card"
import Points from "./Points"
import PlayerMixin from "./PlayerMixin";

export default {
  mixins: [PlayerMixin],
  components: {
    Card,
    Points
  }
};
</script>

<style>
.owner_player {
  background-color: #26c6da;
}
</style>