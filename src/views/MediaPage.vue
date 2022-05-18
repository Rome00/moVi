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
                <span id="runTime" class="">
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
                <div v-if="store.tvSeries" class="flex items-center">
                  <div class="font-raleway capitalize">
                    Created By:
                    <span class="font-medium italic">
                      {{ store.tvSeries.created_by[0].name }}
                    </span>
                  </div>
                </div>
                <RatingStar class="mt-4" size="w-6 h-6" :rating="store.ratingAverage" />
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
            class="mb-6 bg-gradient-to-r from-primary-default via-indigo-500 bg-clip-text text-xl font-medium text-transparent"
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
          class="relative order-1 mb-6 flex min-w-[200px] flex-col space-y-4 bg-gradient-to-r from-zinc-500/5 via-transparent to-transparent py-5 pl-5 font-raleway md:order-2"
        >
          <div class="flex flex-col">
            <span
              class="bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"
            >
              Status:
            </span>
            <span
              class="text-base"
              :class="[
                store.getStatus === 'Released'
                  ? 'font-font-semibold text-teal-600'
                  : 'font-medium text-black',
                store.getStatus === 'Ended'
                  ? 'font-semibold italic text-red-600'
                  : 'font-semibold text-amber-500',
              ]"
            >
              {{ store.getStatus }}
            </span>
          </div>
          <div class="flex flex-col">
            <span
              class="bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"
            >
              Original Language:
            </span>
            <span v-if="store.getLanguage" class="text-base font-medium">
              {{ store.getLanguage }}
            </span>
          </div>
          <template v-if="store.tvSeries">
            <div class="flex flex-col">
              <span
                class="bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"
              >
                first air date:
              </span>
              <span class="text-base font-medium">{{ store.firstAir }}</span>
            </div>
            <div class="flex flex-col">
              <span
                class="bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"
              >
                Last air date:
              </span>
              <span class="text-base font-medium">{{ store.firstAir }}</span>
            </div>
            <div class="flex flex-col">
              <span
                class="bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"
              >
                number of series:
              </span>
              <span class="text-base font-medium">
                {{ store.tvSeries.number_of_episodes }}
              </span>
            </div>
            <div class="flex flex-col">
              <span
                class="bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"
              >
                Networks
              </span>
              <ul class="space-y-2 text-base">
                <li
                  v-for="network in store.tvSeries.networks"
                  :key="network.id"
                  class="mt-3 flex items-center"
                >
                  <figure class="inline-flex max-w-[64px]">
                    <img
                      class="h-auto w-full"
                      :src="imageUrl + '/w154' + network.logo_path"
                    />
                  </figure>
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col">
              <span
                class="bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"
              >
                budget:
              </span>
              <span class="text-base font-medium">{{ store.budget }}</span>
            </div>
            <div class="flex flex-col">
              <span
                class="bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"
              >
                revenue:
              </span>
              <span class="text-base font-medium">{{ store.revenue }}</span>
            </div>
            <div class="flex flex-col">
              <span
                class="bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"
              >
                studios:
              </span>
              <ul class="flex flex-wrap text-base">
                <li
                  v-for="company in store.Movie.production_companies"
                  :key="company.id"
                  class="mt-4 flex items-center"
                >
                  <figure v-if="company.logo_path" class="mr-3 inline-flex max-w-[84px]">
                    <img
                      class="h-auto w-full"
                      :src="imageUrl + '/w154' + company.logo_path"
                    />
                  </figure>
                </li>
              </ul>
            </div>
          </template>
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { MediaStore } from '@/store/Media';
  import { computed } from 'vue';
  import RatingStar from '@/components/RatingStar.vue';

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
