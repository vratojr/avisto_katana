<template>
  <div v-if="player" :class="{'current_player':isCurrentPlayer}">
    {{player.id}}
    <div class="card-holder normal">
      <v-img class="normal" :src="roleImgUrl" />
    </div>
    <div class="card-holder normal">
      <v-img class="normal" :src="characterImgUrl" />
    </div>
    <div v-for="i in lifePoints" :key="i" class="icon-holder small">
      <v-img class="small" :src="require('../assets/life_point.png')" />
    </div>
    <div v-for="i in honorPoints" :key="i" class="icon-holder small">
      <v-img class="small" :src="require('../assets/honor_point.png')" />
    </div>
    <div class="d-flex">
      Hand:
      <div v-for="(card,i) in player.hand" :key="i" class="card-holder big">
        <v-img class="fullwidth" :src="getCardUrl(card)" @click="playCard(i)" />
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
  <!-- <div class="player" >
    <div class="d-flex">
      {{player.id}}
      <div class="card-holder normal">
        <v-img class="fullwidth" :src="roleImgUrl" />
      </div>
      <div class="card-holder normal">
        <v-img class="fullwidth" :src="characterImgUrl" />
      </div>
      <div v-for="i in lifePoints" :key="i" class="icon-holder small">
        <v-img class="fullwidth" :src="require('../assets/life_point.png')" />
      </div>
      <div v-for="i in honorPoints" :key="i" class="icon-holder small">
        <v-img class="fullwidth" :src="require('../assets/honor_point.png')" />
      </div>
      <div v-if="!isOwner" class="d-flex card-holder normal">
        <v-img class="fullwidth" :src="require(`../assets/game/game_back.png`)" />
        <span>X{{player.hand.length}}</span>
      </div>
    </div>
    <div class="d-flex" v-if="isOwner">
      Hand:
      <div v-for="(card,i) in player.hand" :key="i" class="card-holder big">
        <v-img class="fullwidth" :src="getCardUrl(card)" @click="playCard(i)" />
      </div>
    </div>
    <div class="d-flex">
      Game:
      <div v-for="(card,i) in player.game" :key="i" class="card-holder big">
        <v-img class="fullwidth" :src="getCardUrl(card)" @click="discardCardFromGame(i)" />
      </div>
    </div>
    <v-btn @click="endTurn()">End Turn</v-btn>
  </div>-->
</template>

<script>
import PlayerMixin from "./PlayerMixin"

export default {
  mixins: [PlayerMixin]
};
</script>

<style>
.owner_player {
  background-color: #26c6da;
}
</style>