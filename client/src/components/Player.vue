<template>
  <div v-if="player" class="player" :class="{'current_player':isCurrentPlayer,'owner_player':isOwnerPlayer}">
    <div class="d-flex">
      {{player.id}}
      <Card v-if="isShogun" :src="roleImgUrl" size="normal" />
      <Card v-else :src="require('../assets/roles/role_back.png')" size="normal" />
      <Card :src="characterImgUrl" size="normal" />

      <div v-for="i in lifePoints" :key="i" class="icon-holder small">
        <v-img class="small" :src="require('../assets/life_point.png')" />
      </div>
      <div v-for="i in honorPoints" :key="i" class="icon-holder small">
        <v-img class="small" :src="require('../assets/honor_point.png')" />
      </div>
      <div class="d-flex card-holder normal">
        <v-img class="small" :src="require(`../assets/game/game_back.png`)" />
        <span>X{{player.hand.length}}</span>
      </div>
    </div>
    <div class="d-flex">
      Game:
      <Card v-for="(card,i) in player.game" :key="i" :src="getCardUrl(card)" size="big" @click="discardCardFromGame(i)" />
    </div>
    <v-btn @click="endTurn()">End Turn</v-btn>
  </div>
</template>

<script>
import PlayerMixin from "./PlayerMixin"
import Card from "./Card"

export default {
  components: {
    Card
  },
  mixins: [PlayerMixin]
};
</script>

<style>
.player {
  padding: 1rem;
}
</style>