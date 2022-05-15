<template>
  <div
    class="left-50 absolute bottom-1.5 left-1/2 z-10 -translate-x-1/2 transform space-x-2"
  >
    <button
      v-for="(item, index) in total"
      :key="index"
      class="h-1.5 w-6 cursor-pointer border-none bg-white/50"
      :class="{ 'active-slide': currentIndex === index }"
      @click="$emit('switch', index)"
    ></button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      total: {
        type: Number,
        default: 0,
      },
      currentIndex: {
        type: Number,
        default: 0,
      },
    },
    emits: ['switch'],
  });
</script>

<style scoped></style>
