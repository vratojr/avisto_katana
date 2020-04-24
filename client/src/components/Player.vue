<template>
  <div class="player" :class="{'current_player':isCurrentPlayer, 'owner_player': isOwner}">
    <div class="d-flex">
      {{player.id}}
      <div class="card-holder normal">
        <v-img class="small" :src="roleImgUrl" />
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
      <div v-if="!isOwner" class="d-flex card-holder normal">
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
import axios from "axios";

export default {
  props: {
    player: {
      type: Object,
      required: true,
    },
    game: { type: Object, require: true }
  },
  computed: {
    isCurrentPlayer() {
      return this.player.id == this.game.currentPlayer.id;
    },
    isOwner() {
      return this.player.id == this.$store.getters.username;
    },
    roleImgUrl() {
      return require(`../assets/roles/${this.player.role.cardName}.png`);
    },
    lifePoints() {
      if (!this.player.lifePoints) {
        return [];
      }
      return Array.from(Array(this.player.lifePoints));
    },
    honorPoints() {
      if (!this.player.honorPoints) {
        return [];
      }
      return Array.from(Array(this.player.honorPoints));
    },
    characterImgUrl() {
      return require(`../assets/characters/${this.player._character.cardName}.png`);
    }
  },
  methods: {
    getCardUrl(card) {
      return require(`../assets/game/${card.cardType}/${card.cardName}.png`);
    },
    playCard(index) {
      if (this.isCurrentPlayer) {
        axios.put(`api/players/${this.player.id}/hand/${index}/play`);
      }
    },
    discardCardFromGame(index) {
      axios.put(`api/players/${this.player.id}/game/${index}/discard`);
    },

    endTurn() {
      //if (this.isCurrentPlayer) { TODO uncomment
      axios.post("/api/game/endTurn");
      //}
    }
  }
};
</script>

<style>
.player {
  padding: 1rem;
}
.current_player {
  border: 0.1rem solid red !important;
}
.owner_player {
  background-color: #26c6da;
}
</style>