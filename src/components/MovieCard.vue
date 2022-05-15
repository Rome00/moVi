<template>
  <article
    class="relative h-full min-h-[350px] overflow-hidden rounded-md shadow-md shadow-slate-700 transition-transform delay-100 duration-300 hover:scale-105"
  >
    <figure>
      <img :src="baseImageURL + movie.poster_path" :alt="movie.original_title" />
    </figure>
    <div
      class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black to-transparent shadow-inner"
    >
      <div class="px-3 py-6 text-white">
        <h1 class="font-raleway text-lg font-bold capitalize">
          {{ truncate(movie.original_title, 30) }}
        </h1>
        <ul class="my-4 inline-flex flex-wrap space-x-1">
          <li
            v-for="(genre, i) in movie.genre_ids.slice(0, 3)"
            :key="i"
            class="table-cell rounded-lg bg-slate-50 px-1.5 align-middle text-xs text-slate-800"
          >
            <span class="font-raleway">{{ genreNames(genre) }}</span>
          </li>
        </ul>
        <p>{{ truncate(movie.overview, 100) }}</p>
        <RatingStar :rating="movie.vote_average" />
        <router-link
          v-slot="{ navigate }"
          custom
          :to="{ name: 'Media', params: { id: movie.id } }"
        >
          <button
            class="float-right my-4 rounded-2xl px-6 py-1.5 capitalize text-indigo-400 outline-none ring-2 ring-indigo-400 transition-colors duration-300 hover:bg-indigo-400 hover:text-white"
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
  import { BaseMovie } from '@/interfaces/Movie';
  import useMediaSize from '@/helpers/MediaSize';
  import { computed, PropType } from 'vue';
  import { MovieStore } from '@/store/Movie';
  import { Genre } from '@/interfaces/Root';
  import RatingStar from '@/components/RatingStar.vue';

  defineProps({
    movie: {
      type: Object as PropType<BaseMovie>,
      required: true,
    },
  });
  const { width } = useMediaSize();
  const baseImageURL = computed(() => {
    return width.value < 640
      ? import.meta.env.VITE_IMAGE_URL + 'w154'
      : import.meta.env.VITE_IMAGE_URL + 'w342';
  });

  const store = MovieStore();

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
