<template>
  <div v-if="player" class="player" :class="{'current_player':isCurrentPlayer,'owner_player':isOwnerPlayer}">
    <div class="d-flex">
      {{player.id}}
      <div class="card-holder normal">
        <v-img v-if="isShogun" class="small" :src="roleImgUrl" />
        <v-img v-else class="small" :src="require('../assets/roles/role_back.png')" />
      </div>
      <div class="card-holder normal">
        <v-img class="small" :src="characterImgUrl" />
      </div>
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
      <div v-for="(card,i) in player.game" :key="i" class="card-holder big">
        <v-img class="fullwidth" :src="getCardUrl(card)" @click="discardCardFromGame(i)" />
      </div>
    </div>
    <v-btn @click="endTurn()">End Turn</v-btn>
  </div>
</template>

<script>
import PlayerMixin from "./PlayerMixin"

export default {
  mixins: [PlayerMixin]
};
</script>

<style>
.player {
  padding: 1rem;
}
</style>