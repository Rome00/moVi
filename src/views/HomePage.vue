<template>
  <main class="bg-white">
    <Carousel
      v-if="store.movies"
      :movies="store.movies.slice(0, 10)"
      height="h-[450px]"
    />
    <div class="h-full w-full py-10">
      <div class="container mx-auto px-8">
        <div class="w-full">
          <div
            class="cardItem grid grid-cols-12 gap-y-8 sm:gap-10 sm:justify-self-center md:gap-14"
          >
            <div
              v-for="item in store.movies"
              :key="item.id"
              class="col-span-12 sm:col-span-6 sm:justify-self-center lg:col-span-4 2xl:col-span-3"
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

  const store = MovieStore();
  const pageInfo = pagination();

  store.getGenres();
  store.getMovies(pageInfo.page);

  watch(
    () => pageInfo.page,
    function (val) {
      store.getMovies(val);
    }
  );
</script>
