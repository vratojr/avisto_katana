<template>
  <div class="d-flex section ml-5">
    <div class="card-holder normal">
      <div class="d-flex flex-column normal align-center">
        <v-img v-if="game.gameDeck.cards.length>0" class="fullwidth" :src="require(`../assets/game/game_back.png`)" @click="drawGameCard" />
        <span>X {{game.gameDeck.cards.length}}</span>
      </div>
    </div>
    <Card v-if="lastDiscardedCard" :src="lastDiscardedCardImage" size="normal" @click="drawDiscarded" />
  </div>
</template>

<script lang="ts">
import * as commService from "../services/commService";
import Vue from "vue";
import { Game } from "@shared/entities/game";
import Card from "./Card.vue";

export default Vue.extend({
  components: {
    Card
  },
  props: {
    game: { type: Game, required: true }
  },
  computed: {
    lastDiscardedCard() {
      if (this.game.discardedGameDeck.cards.length === 0) {
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
      commService.drawDiscarded();
    },
    drawGameCard() {
      commService.drawGameCard();
    }
  }
});
</script>

<style>
.ml-5 {
  margin-left: 5rem;
}
</style>
