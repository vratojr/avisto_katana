<template>
  <div v-if="player" :class="{'current_player':isCurrentPlayer}">
    {{player.id}}
    <Card :src="roleImgUrl" size="normal" />
    <Card :src="characterImgUrl" size="normal" />
    <div v-for="i in lifePoints" :key="i" class="icon-holder small">
      <v-img class="small" :src="require('../assets/life_point.png')" />
    </div>
    <div v-for="i in honorPoints" :key="i" class="icon-holder small">
      <v-img class="small" :src="require('../assets/honor_point.png')" />
    </div>
    <div class="d-flex">
      Hand:
      <Card v-for="(card,i) in player.hand" :key="i" :src="getCardUrl(card)" size="big" @click="playCard(i)" />
    </div>
    <div class="d-flex">
      Game:
      <Card v-for="(card,i) in player.game" :key="i" :src="getCardUrl(card)" size="big" @click="discardCardFromGame(i)" />
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
import Card from "./Card"
import PlayerMixin from "./PlayerMixin"

export default {
  components: {
    Card
  },
  mixins: [PlayerMixin]
};
</script>

<style>
.owner_player {
  background-color: #26c6da;
}
</style>