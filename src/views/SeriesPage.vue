<template>
  <main class="bg-gray-100">
    <div class="h-full w-full">
      <div
        class="3xl:h-[832px] h-[543px] bg-cover bg-center bg-no-repeat sm:h-[365px] lg:h-[644px]"
      ></div>
      <div id="categories" class="container mx-auto px-8 py-20">
        <div class="w-full">
          <div
            class="cardItem grid grid-cols-12 gap-y-8 justify-self-center sm:gap-8"
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { SeriesStore } from '@/store/Tv';

  const store = SeriesStore();
</script>
