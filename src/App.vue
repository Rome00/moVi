<script setup lang="ts">
  import AppHeader from '@/components/shared/AppHeader.vue';
  import AppFooter from '@/components/shared/AppFooter.vue';
  import AppLoader from './components/AppLoader.vue';
  import { pagination } from '@/store/PageInfo';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();

  const pageInfo = pagination();

  const loading = computed(() => pageInfo.loading);
</script>

<template>
  <AppHeader />
  <router-view v-show="!loading"></router-view>
  <AppLoader v-show="loading" />
  <AppFooter v-if="!loading && route.name !== 'media'" />
</template>
