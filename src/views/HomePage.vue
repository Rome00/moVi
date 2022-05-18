<template>
  <main class="bg-white">
    <Carousel
      v-if="store.movies"
      :indicators="width > 640"
      :movies="store.movies.slice(0, 10)"
      height="h-[450px] 2xl:h-[600px]"
    />
    <div class="h-full w-full py-10">
      <div class="container mx-auto px-8 xs:max-w-full md:container">
        <div class="w-full">
          <div class="grid grid-cols-12 gap-y-8 justify-self-center sm:gap-10 md:gap-14">
            <div
              v-for="item in store.movies"
              :key="item.id"
              class="col-span-12 justify-self-center md:col-span-6 lg:col-span-4 2xl:col-span-3"
            >
              <MovieCard :movie="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { MovieStore } from '@/store/Movie';
  import { pagination } from '@/store/PageInfo';
  import { watch } from 'vue';
  import Carousel from '@/components/carousel/CarouselWrapper.vue';
  import MovieCard from '@/components/MovieCard.vue';
  import mediaSize from '@/helpers/MediaSize';

  const store = MovieStore();
  const pageInfo = pagination();

  // await all promises
  store.getGenres().then((res) => {
    if (res) store.getMovies(pageInfo.page);
  });

  const { width } = mediaSize();

  watch(
    () => pageInfo.page,
    function (val) {
      store.getMovies(val);
    }
  );
</script>
