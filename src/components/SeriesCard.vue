<template>
  <article
    class="relative flex h-full max-w-[342px] overflow-hidden rounded-md shadow-md shadow-slate-700 transition-transform delay-100 duration-300 hover:scale-105 xs:max-w-full md:min-h-[350px]"
  >
    <figure
      class="min-w-[184px] bg-gradient-to-t from-black via-black to-transparent md:min-w-full"
    >
      <img :src="baseImageURL + series.poster_path" :alt="series.original_name" />
    </figure>
    <div
      class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black to-transparent shadow-inner xs:relative md:absolute"
    >
      <div class="select-none px-3 py-6 text-white">
        <h1 class="font-raleway text-lg font-bold capitalize">
          {{ truncate(series.original_name, 30) }}
        </h1>
        <ul class="my-4 inline-flex flex-wrap space-x-1 xs:my-2 sm:my-4">
          <li
            v-for="(genre, i) in series.genre_ids.slice(0, 3)"
            :key="i"
            class="table-cell rounded-lg bg-slate-50 px-1.5 align-middle text-xs text-slate-800"
          >
            <span class="font-raleway">{{ genreNames(genre) }}</span>
          </li>
        </ul>
        <p>{{ truncate(series.overview, 100) }}</p>
        <RatingStar :rating="series.vote_average" />
        <router-link
          v-slot="{ navigate }"
          custom
          :to="{ name: 'Media', params: { id: series.id } }"
        >
          <button
            class="bottom-2 right-6 float-right my-4 rounded-2xl px-6 py-1.5 capitalize text-indigo-400 outline-none ring-2 ring-indigo-400 transition-colors duration-300 hover:bg-indigo-400 hover:text-white xs:absolute md:relative md:right-0"
            @click="navigate"
          >
            read more
          </button>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { BaseTv } from '@/interfaces/Tv';
  import { computed, PropType } from 'vue';
  import { SeriesStore } from '@/store/Tv';
  import { Genre } from '@/interfaces/Root';
  import RatingStar from '@/components/RatingStar.vue';

  defineProps({
    series: {
      type: Object as PropType<BaseTv>,
      required: true,
    },
  });

  const baseImageURL = computed(() => {
    return import.meta.env.VITE_IMAGE_URL + 'w342';
  });

  const store = SeriesStore();

  const genreNames = (id: number): string => {
    return store.genres.find((x: Genre) => x.id === id)?.name;
  };

  const truncate = (str: string, maxLength: number): string => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };
</script>
