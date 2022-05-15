import { defineStore } from 'pinia';
import axios from 'axios';
import { TvList } from '@/interfaces/Root';
import { pagination } from './PageInfo';

export const SeriesStore = defineStore('SeriesStore', {
  state: () =>
    ({
      genres: null,
      series: null,
    } as TvList),
  getters: {},
  actions: {
    async getGenres() {
      await axios
        .get(
          import.meta.env.VITE_API_BASE_URL +
            'genre/movie/list?' +
            import.meta.env.VITE_API_KEY
        )
        .then((result) => {
          this.genres = result.data.genres;
        });
    },
    async getMovies(page: number) {
      await axios
        .get(
          import.meta.env.VITE_API_BASE_URL +
            'discover/movie?' +
            import.meta.env.VITE_API_KEY +
            '&language=en-US&sort_by=popularity.desc&with_original_language=en&page=' +
            page
        )
        .then((result) => {
          const pageInfo = pagination();
          pageInfo.page = page;
          pageInfo.total_pages = result.data.total_pages;
          pageInfo.total_results = result.data.total_results;
          this.series = result.data.results;
        });
    },
  },
});
