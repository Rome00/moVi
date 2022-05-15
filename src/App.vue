<script setup lang="ts">
  import { ref } from 'vue';
  import AppHeader from '@/components/shared/AppHeader.vue';
  import AppFooter from '@/components/shared/AppFooter.vue';

  const search = ref('');
</script>

<template>
  <AppHeader v-model:search="search" />
  <router-view></router-view>
  <AppFooter />
</template>
