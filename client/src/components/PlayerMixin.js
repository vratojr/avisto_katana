import axios from "axios";

export default {
  props: {
    player: {
      type: Object
    }
  },
  computed: {
    roleImgUrl() {
      return require(`../assets/roles/${this.player.role.cardName}.png`);
    },
    characterImgUrl() {
      return require(`../assets/characters/${this.player._character.cardName}.png`);
    },
    isCurrentPlayer() {
      return this.player.isCurrentPlayer;
    },
    isShogun() {
      return this.player.role.cardName.toLowerCase() == "shogun"
    },
    isOwnerPlayer() {
      return this.player.isOwnerPlayer;
    }
  },
  methods: {
    getCardUrl(card) {
      return require(`../assets/game/${card.cardType}/${card.cardName}.png`);
    },
    playCard(index) {
      axios.put(`api/players/${this.player.id}/hand/${index}/play`);
    },
    discardCardFromGame(index) {
      axios.put(`api/players/${this.player.id}/game/${index}/discard`);
    },

    endTurn() {
      //if (this.isCurrentPlayer) {
        axios.post("/api/game/endTurn");
      //}
    }
  }
};