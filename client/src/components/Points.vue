<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row">
      <div v-for="i in lifePoints" :key="i" class="icon-holder small">
        <v-img class="small" :src="require('../assets/life_point.png')" @click="alterLifePoints(-1)" />
      </div>
      <div v-for="i in maxLifePoints" :key="i" class="icon-holder small">
        <v-img class="small dark" :src="require('../assets/life_point.png')" @click="alterLifePoints(1)" />
      </div>
    </div>
    <div class="d-flex flex-row">
      <div v-for="i in honorPoints" :key="i" class="icon-holder small">
        <v-img class="small" :src="require('../assets/honor_point.png')" @click="alterHonorPoints(-1)" />
      </div>
      <div v-for="i in maxHonorPoints" :key="i" class="icon-holder small">
        <v-img class="small dark" :src="require('../assets/honor_point.png')" @click="alterHonorPoints(1)" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    player: {
      type: Object
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lifePoints() {
      if (!this.player._lifePoints) {
        return [];
      }
      return Array.from(Array(this.player._lifePoints))
    },
    maxLifePoints() {
      if (!this.player.maxLifePoints) {
        return [];
      }
      return Array.from(Array(this.player.maxLifePoints - this.player._lifePoints))
    },
    honorPoints() {
      if (!this.player._honorPoints) {
        return [];
      }
      return Array.from(Array(this.player._honorPoints));
    },
    maxHonorPoints() {
      if (!this.player._honorPoints) {
        return [];
      }
      return Array.from(Array(this.player.maxHonorPoints - this.player._honorPoints));
    },
  },
  methods: {
    alterLifePoints(quantity) {
      if (!this.editable) return
      axios.put(
        `api/players/${this.player.id}/addLifePoints?quantity=${quantity}`
      );
    },
    alterHonorPoints(quantity) {
      if (!this.editable) return
      axios.put(
        `api/players/${this.player.id}/addHonorPoints?quantity=${quantity}`
      );
    }
  }
}
</script>

<style>
.dark {
  filter: brightness(50%);
}
</style>