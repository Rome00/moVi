<template>
  <main v-if="store.Movie || store.tvSeries" class="bg-gray-100">
    <section class="bg-cover bg-top">
      <div class="bg-gradient-to-t from-gray-800/90 via-gray-800/80 to-gray-800/90">
        <div class="container mx-auto">
          <div class="flex flex-col px-10 py-[30px] md:flex-row">
            <figure class="h-[450px] w-[300px] min-w-[300px] overflow-hidden rounded-md">
              <img v-if="movie" :src="imageUrl + movie.poster_path" />
              <img v-else :src="imageUrl + tv.poster_path" />
            </figure>
            <div class="flex flex-wrap content-center items-start text-white md:pl-10">
              <h1 class="text-5xl font-bold font-barlow">
                {{ movie ? movie.original_title : tv.original_name }}
              </h1>
              <div class="mt-2 flex w-full flex-wrap text-base font-raleway">
                <span class="rounded-sm border px-1 opacity-60">
                  {{
                    movie
                      ? movie.release_dates.results.find((el) => el.iso_3166_1 === 'US')
                          .release_dates[0].certification
                      : tv.content_ratings.results.find((el) => el.iso_3166_1 === 'US')
                          .rating
                  }}
                </span>
                <span
                  class="before:px-2 before:content-['\2022'] after:px-2 after:content-['\2022']"
                >
                  {{ date }}
                </span>
                <span
                  v-for="genre in genres"
                  :key="genre.id"
                  class="flex flex-wrap space-x-2"
                >
                  <span class="after:px-2 after:content-['\2022']">
                    {{ genre.name }}
                  </span>
                </span>
                <span id="runTime" class="before:px-2 before:content-['\2022']">
                  {{ runTime }}
                </span>
              </div>
              <div class="mt-5 flex w-full flex-col">
                <h2 class="text-white/60">{{ movie ? movie.tagline : tv.tagline }}</h2>
                <div class="mt-5 flex flex-col text-white">
                  <div class="text-2xl font-medium font-display">Overview</div>
                  <p class="mt-2">{{ movie ? movie.overview : tv.overview }}</p>
                </div>
                <div class="mt-6 flex w-full justify-between">
                  <div v-for="person in crew" :key="person.id" class="flex flex-col">
                    <div class="font-base text-center text-lg">{{ person.name }}</div>
                    <div class="text-center text-sm">{{ person.job }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto mt-10 px-4">
      <div class="flex flex-col sm:flex-row">
        <div class="order-2 flex flex-col sm:order-1 sm:w-[calc(100%-200px)]">
          <h3 class="text-xl font-medium text-black">Top Billed Cast</h3>
          <div class="flex overflow-x-auto"></div>
          <div class="mt-8 mb-20 border-t border-gray-300">
            <h3 class="mt-8 mb-4 text-xl font-medium text-black">Media</h3>
            <div class="flex overflow-x-auto"></div>
          </div>
        </div>
        <div
          class="order-1 mb-6 flex min-w-[200px] flex-col space-y-4 pt-5 pl-5 sm:order-2"
        >
          <div class="flex flex-col">
            <span class="font-medium text-black">Status:</span>
            <span class="text-sm"></span>
          </div>
          <div class="flex flex-col">
            <span class="font-medium text-black">Original Language:</span>
            <span class="text-sm"></span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { MediaStore } from '@/store/Media';
  import { computed } from 'vue';

  const route = useRoute();
  const store = MediaStore();

  store.Movie = null;
  store.tvSeries = null;

  const payload = {
    id: parseInt(route.params.id as string),
    type: route.params.media as string,
  };

  const movie = computed(() => store.Movie);
  const tv = computed(() => store.tvSeries);

  const date = computed((): string => {
    const date = new Date(movie.value?.release_date ?? tv.value?.first_air_date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });
  const runTime = computed((): string => {
    const time = movie.value ? movie.value.runtime : tv.value.episode_run_time[0];
    return `${Math.floor(time / 60)}h ${time % 60}m`;
  });
  const genres = computed(() => (movie.value ? movie.value.genres : tv.value.genres));
  const crew = computed(() => {
    const crew = movie.value?.credits?.crew ?? tv.value?.credits?.crew;
    const director = crew?.filter((el) => el.job === 'Director');
    const screenplay = crew?.filter(
      (el) => el.job === 'Screenplay' || el.job === 'Novel'
    );
    return [...director, ...screenplay];
  });

  store.loadMediaInfo(payload);
  const imageUrl = computed(() => import.meta.env.VITE_IMAGE_URL + 'w1280');
</script>
