<template>
  <div class="card-holder zoom" :class="size">
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

<style>
.card-holder.normal {
  width: 5rem;
}

.card-holder.normal {
  width: 5rem;
}

.card-holder.big {
  width: 9rem;
}

.zoom {
  transition: transform 0.2s; /* Animation */
}

.zoom:hover {
  transform: scale(
    2
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  z-index: 1;
}
</style>