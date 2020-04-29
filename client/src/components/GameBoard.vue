<template>
  <div class="d-flex section ml-5">
    <div class="card-holder normal">
      <v-img v-if="game.gameDeck.cards.length>0" class="fullwidth" :src="require(`../assets/game/game_back.png`)" @click="drawGameCard" />
    </div>
    <Card v-if="lastDiscardedCard" :src="lastDiscardedCardImage" size="normal" @click="drawDiscarded" />
  </div>
</template>

<script>
import axios from "axios";
import Card from "./Card"
export default {
  components: {
    Card,
  },
  props: {
    game: { type: Object, required: true }
  },
  computed: {
    lastDiscardedCard() {
      if (this.game.discardedGameDeck.cards.length == 0) {
        return null;
      }
      return this.game.discardedGameDeck.cards[
        this.game.discardedGameDeck.cards.length - 1
      ];
    },
    lastDiscardedCardImage() {
      if (!this.lastDiscardedCard) {
        return "";
      }
      return require(`../assets/game/${this.lastDiscardedCard.cardType}/${this.lastDiscardedCard.cardName}.png`);
    }
  },
  methods: {
    drawDiscarded() {
      axios.put(`api/players/${this.$store.getters.username}/drawDiscarded`);
    },
    drawGameCard() {
      axios.put(`api/players/${this.$store.getters.username}/draw`);
    }
  }
};
</script>

<style>
.ml-5 {
  margin-left: 5rem;
}
</style>