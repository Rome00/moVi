<template>
  <article
    class="relative flex h-full max-w-[342px] overflow-hidden rounded-md shadow-md shadow-slate-700 transition-transform delay-100 duration-300 hover:scale-105 xs:max-w-full md:min-h-[350px]"
  >
    <figure
      class="min-w-[184px] bg-gradient-to-t from-black via-black to-transparent md:min-w-full"
    >
      <img :src="baseImageURL + movie.poster_path" :alt="movie.original_title" />
    </figure>
    <div
      class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black to-transparent shadow-inner xs:relative md:absolute"
    >
      <div class="select-none px-3 py-6 text-white">
        <h1 class="font-raleway text-lg font-bold capitalize">
          {{ truncate(movie.original_title, 30) }}
        </h1>
        <ul class="my-4 inline-flex flex-wrap space-x-1 xs:my-2 sm:my-4">
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
          :to="{ name: 'media', params: { id: movie.id, media: $route.name } }"
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
  import { BaseMovie } from '@/interfaces/Movie';
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

  const baseImageURL = computed(() => {
    return import.meta.env.VITE_IMAGE_URL + 'w342';
  });

  const store = MovieStore();

  const genreNames = (id: number) => {
    return store.genres.find((x: Genre) => x.id === id)?.name;
  }

  const truncate = (str: string, maxLength: number): string => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };
</script>
