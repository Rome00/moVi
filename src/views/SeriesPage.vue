<template>
  <main class="bg-white">
    <Carousel
      v-if="store.series"
      :indicators="width > 640"
      :series="store.series.slice(0, 10)"
      height="h-[450px]"
    />
    <div class="h-full w-full py-10">
      <div class="container mx-auto px-8 xs:max-w-full md:container">
        <div class="w-full">
          <div class="grid grid-cols-12 gap-y-8 justify-self-center sm:gap-10 md:gap-14">
            <div
              v-for="item in store.series"
              :key="item.id"
              class="col-span-12 justify-self-center md:col-span-6 lg:col-span-4 2xl:col-span-3"
            >
              <SeriesCard :series="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import Carousel from '@/components/carousel/CarouselWrapper.vue';
  import SeriesCard from '@/components/SeriesCard.vue';
  import { SeriesStore } from '@/store/Tv';
  import { pagination } from '@/store/PageInfo';
  import mediaSize from '@/helpers/MediaSize';
  import { watch } from 'vue';

  const store = SeriesStore();
  const pageInfo = pagination();

  store.getGenres();
  store.getTvSeries(pageInfo.page);

  const { width } = mediaSize();

  watch(
    () => pageInfo.page,
    function (val) {
      store.getTvSeries(val);
    }
  );
</script>
