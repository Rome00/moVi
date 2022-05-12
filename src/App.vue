<script setup lang="ts">
  import { ref } from 'vue';
  import AppHeader from '@/components/AppHeader.vue';

  const search = ref('');
</script>

<template>
  <AppHeader v-model:search="search" />
  <router-view></router-view>
</template>
