<template>
  <div class="player" :class="{'current_player':isCurrentPlayer}">
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
        <v-img class="fullwidth" :src="getCardUrl(card)" />
      </div>
    </div>
    <v-btn @click="endTurn()">End Turn</v-btn>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  props: {
    player: {
      type: Object, required: true,
      default: () => {
        role: {
          cardName: ""
        }
        honorPoints: 0
        lifePoints: 0
        position: 0
        hand: []
      }
    },
    game: { type: Object, require: true }
  },
  computed: {
    roleImgUrl() {
      if (this.isOwner) {
        return require(`../assets/roles/${this.player.role.cardName}.png`)
      }
      else {
        return require(`../assets/roles/role_back.png`)
      }
    },
    lifePoints() {
      return Array.from(Array(this.player.lifePoints));
    },
    honorPoints() {
      return Array.from(Array(this.player.honorPoints));
    },
    characterImgUrl() {
      return require(`../assets/characters/${this.player._character.cardName}.png`)
    },
    isOwner() {
      return this.player.id == this.$store.getters.username
    },
    isCurrentPlayer() {
      return this.player.id == this.game.currentPlayer.id
    }
  },
  methods: {
    getCardUrl(card) {
      return require(`../assets/game/${card.cardType}/${card.cardName}.png`)
    },
    playCard(index) {
      if (this.isCurrentPlayer) {
        axios.put(`api/players/${this.player.id}/playCard/${index}`)
      }
    },
    endTurn() {
      //if (this.isCurrentPlayer) { TODO uncomment
      axios.post('/api/game/endTurn')
      //}
    }
  }
}
</script>

<style>
.current_player {
  border: 0.1rem solid red !important;
}
.player {
  border: 0.1rem solid black;
  padding: 1rem;
}
</style>