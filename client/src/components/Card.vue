<template>
  <div class="card-holder zoom" :class="size" @click="$emit('click')">
    <v-img :src="src" />
  </div>
</template>

<script>

export default {
  props: {
    src: { type: String },
    size: { type: String },
  }
};
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

  :hover {
    transform: scale(
      4
    ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
    z-index: 1;
    transition-delay: 0.4s;
  }
}
</style>