<script setup lang="ts">
  import AppFooter from '@/components/shared/AppFooter.vue';
  import AppHeader from '@/components/shared/AppHeader.vue';
  import ToastMessage from '@/components/shared/ToastMessage.vue';
  import { pagination } from '@/store/PageInfo';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import AppLoader from './components/AppLoader.vue';

  const route = useRoute();

  const pageInfo = pagination();

  const loading = computed(
    () =>
      (pageInfo.loading && route.name === 'media') ||
      (pageInfo.loading && route.name === 'movie')
  );
</script>

<template>
  <AppHeader />
  <router-view v-show="!loading"></router-view>
  <AppLoader v-show="loading" />
  <AppFooter v-if="!loading && route.name !== 'Auth'" />
  <ToastMessage />
</template>
