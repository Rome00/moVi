import { defineStore } from 'pinia';
import axios from 'axios';
import { MovieList } from '@/interfaces/Root';
import { pagination } from './PageInfo';

export const MovieStore = defineStore('MovieStore', {
  state: () =>
    ({
      genres: null,
      movies: null,
    } as MovieList),
  getters: {},
  actions: {
    async getGenres() {
      return new Promise((res) => {
        axios
          .get(
            import.meta.env.VITE_API_BASE_URL +
              'genre/movie/list?' +
              import.meta.env.VITE_API_KEY
          )
          .then((result) => {
            this.genres = result.data.genres;
            res(true);
          });
      });
    },
    async getMovies(page: number) {
      const pageInfo = pagination();
      pageInfo.loading = true;
      await axios
        .get(
          import.meta.env.VITE_API_BASE_URL +
            'discover/movie?' +
            import.meta.env.VITE_API_KEY +
            '&language=en-US&sort_by=popularity.desc&with_original_language=en&page=' +
            page
        )
        .then((result) => {
          pageInfo.page = page;
          pageInfo.total_pages = result.data.total_pages;
          pageInfo.total_results = result.data.total_results;
          this.movies = result.data.results;
          pageInfo.loading = false;
        });
    },
  },
});
