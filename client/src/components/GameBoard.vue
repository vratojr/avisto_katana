<template>
  <div class="d-flex d-flex-direction-col mr-100">
    <div class="card-holder normal">
      <v-img class="fullwidth" :src="require(`../assets/game/game_back.png`)" />
    </div>
    <div v-if="lastDiscardedCard" class="card-holder normal">
      <v-img class="fullwidth" :src="lastDiscardedCardImage" @click="drawDiscarded" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    game: { type: Object, required: true }
  },
  computed: {
    lastDiscardedCard() {
      if (this.game.discardedGameDeck.cards.length == 0) {
        return null;
      }
      return this.game.discardedGameDeck.cards[this.game.discardedGameDeck.cards.length - 1]
    },
    lastDiscardedCardImage() {
      if (!this.lastDiscardedCard) {
        return ""
      }
      return require(`../assets/game/${this.lastDiscardedCard.cardType}/${this.lastDiscardedCard.cardName}.png`)
    },
  },
  methods: {
    drawDiscarded() {
      axios.put(`api/players/${this.$store.getters.username}/drawDiscarded`)
    },
  }
}
</script>

<style>
.mr-100 {
  margin-right: 100px;
}
</style>