<template>
  <div class="card-holder zoom" :class="[size,hover?'zoomed':'']" @click="$emit('click')" @mousemove.ctrl="hover = true" @mouseleave="hover = false">
    <v-img :src="src" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    src: { type: String },
    size: { type: String }
  },
  data() {
    return {
      hover: false
    };
  }
});
</script>

<style lang="scss">
@import "../scss/shadow";

.card-holder {
  @extend %shadow-2-dp;
  margin: 0.2rem;

  .normal {
    width: 5rem;
  }

  .big {
    width: 9rem;
  }
}

.zoom {
  transition: transform 0.2s; /* Animation */

  &.zoomed {
    transform: scale(
      4
    ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
    z-index: 1;
  }
}
</style>
