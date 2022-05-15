<script setup lang="ts">
  import AppHeader from '@/components/shared/AppHeader.vue';
  import AppFooter from '@/components/shared/AppFooter.vue';
  import AppLoader from './components/AppLoader.vue';
  import { pagination } from '@/store/PageInfo';

  const pageInfo = pagination();
</script>

<template>
  <AppHeader />
  <router-view v-show="!pageInfo.loadingState"></router-view>
  <AppLoader v-show="pageInfo.loadingState" />
  <AppFooter />
</template>
