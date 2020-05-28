import Vue from "vue";
import * as commService from "../services/commService";
import { GameCard } from "@shared/entities/card";

export default Vue.extend({
  props: {
    player: {
      type: Object
    }
  },
  computed: {
    roleImgUrl(): string {
      return require(`../assets/roles/${this.player.role.cardName}.png`);
    },
    characterImgUrl(): string {
      return require(`../assets/characters/${this.player._character.cardName}.png`);
    },
    isCurrentPlayer(): boolean {
      return this.player.isCurrentPlayer;
    },
    isShogun(): boolean {
      return this.player.role.cardName.toLowerCase() === "shogun";
    },
    isOwnerPlayer(): boolean {
      return this.player.isOwnerPlayer;
    }
  },
  methods: {
    getCardUrl(card: GameCard): void {
      return require(`../assets/game/${card.cardType}/${card.cardName}.png`);
    },
    playCard(index: number): void {
      commService.playCard(index);
    },
    suffleHand(): void {
      commService.sufflePlayerHand();
    },
    discardCardFromHand(index: number): void {
      commService.discardCardFromHand(index);
    },
    discardCardFromGame(index: number): void {
      commService.discardCardFromGame(index);
    },

    endTurn(): void {
      // if (this.isCurrentPlayer) {
      commService.endTurn()
      // }
    }
  }
});
