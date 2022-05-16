<template>
  <main v-if="store.Movie || store.tvSeries" class="bg-gray-100">
    <section class="bg-cover bg-top">
      <div class="bg-gradient-to-t from-gray-800/90 via-gray-800/80 to-gray-800/90">
        <div class="container mx-auto">
          <div
            class="flex flex-col items-center px-10 py-[30px] md:flex-row md:items-start"
          >
            <figure class="h-[450px] w-[300px] min-w-[300px] overflow-hidden rounded-md">
              <img v-if="movie" :src="imageUrl + 'w500' + movie.poster_path" />
              <img v-else :src="imageUrl + 'w500' + tv.poster_path" />
            </figure>
            <div class="flex flex-wrap content-center items-start text-white md:pl-10">
              <h1 class="font-barlow text-5xl font-bold">
                {{ movie ? movie.original_title : tv.original_name }}
              </h1>
              <div class="mt-2 flex w-full flex-wrap font-raleway text-base">
                <span class="rounded-sm border px-1 opacity-60">
                  {{ store.certification }}
                </span>
                <span
                  class="before:px-2 before:content-['\2022'] after:px-2 after:content-['\2022']"
                >
                  {{ store.releaseDate }}
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
                  {{ store.runTime }}
                </span>
              </div>
              <div class="mt-5 flex w-full flex-col">
                <h2 class="text-white/60">{{ movie ? movie.tagline : tv.tagline }}</h2>
                <div class="mt-5 flex flex-col text-white">
                  <div class="font-display text-2xl font-medium">Overview</div>
                  <p class="mt-2">{{ movie ? movie.overview : tv.overview }}</p>
                </div>
                <div class="mt-6 flex w-full justify-between">
                  <div
                    v-for="person in store.getCrew"
                    :key="person.id"
                    class="flex flex-col"
                  >
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
      <div class="flex flex-col md:flex-row">
        <div class="order-2 flex flex-col md:order-1 md:w-[calc(100%-200px)]">
          <h3
            class="mb-6 bg-gradient-to-r from-primary-default via-indigo-500 to-indigo-400 bg-clip-text text-xl font-medium text-transparent"
          >
            Top Billed Cast
          </h3>
          <div class="flex overflow-x-auto">
            <div
              v-for="person in store.getCast"
              :key="person.id"
              class="m-3 min-w-[138px] max-w-[140px] overflow-hidden rounded-md pb-3 shadow-md"
            >
              <figure class="block h-[175px] w-[140px]">
                <img
                  class="h-full w-full"
                  :src="imageUrl + 'w185' + person.profile_path"
                />
              </figure>
              <p class="text px-2.5 pt-2.5 text-base font-medium text-black">
                {{ person.name }}
              </p>
              <p class="text px-2.5 pt-2.5 text-xs text-black">{{ person.character }}</p>
            </div>
          </div>
          <div class="mt-8 mb-20 border-t border-gray-300">
            <h3
              class="mt-8 mb-6 bg-gradient-to-r from-primary-default via-indigo-500 to-indigo-400 bg-clip-text text-xl font-medium text-transparent"
            >
              Media
            </h3>
            <div class="flex overflow-x-auto">
              <figure
                v-for="(image, i) in store.getImages"
                :key="i"
                class="mb-3 w-80 min-w-[300px] px-0.5"
              >
                <img :src="imageUrl + 'w300' + image.file_path" alt="" />
              </figure>
            </div>
          </div>
        </div>
        <aside
          class="relative order-1 mb-6 flex min-w-[200px] flex-col space-y-4 bg-gradient-to-r from-zinc-500/5 via-transparent to-transparent py-5 pl-5 md:order-2"
        >
          <div class="flex flex-col">
            <span
              class="bg-gradient-to-r from-primary-default via-primary-light to-indigo-400 bg-clip-text text-lg font-bold text-transparent"
            >
              Status:
            </span>
            <span class="text-base">{{ store.getStatus }}</span>
          </div>
          <div class="flex flex-col">
            <span
              class="bg-gradient-to-r from-primary-default via-primary-light to-indigo-400 bg-clip-text text-lg font-bold text-transparent"
            >
              Original Language:
            </span>
            <span class="text-base">{{ store.getLanguage }}</span>
          </div>
        </aside>
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
  // payload for API call with media id and type => movie or tv
  const payload = {
    id: parseInt(route.params.id as string),
    type: route.params.media as string,
  };
  // call the api
  store.loadMediaInfo(payload);

  const movie = computed(() => store.Movie);
  const tv = computed(() => store.tvSeries);

  // media genres
  const genres = computed(() => (movie.value ? movie.value.genres : tv.value.genres));

  // computed fn that returns image url
  const imageUrl = computed(() => import.meta.env.VITE_IMAGE_URL);
</script>
