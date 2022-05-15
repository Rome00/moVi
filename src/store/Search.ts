import { defineStore } from 'pinia';
import axios from 'axios';
import { SearchResult } from '@/interfaces/Root';

interface SearchParams {
  searchKey: string;
  type: string;
}

export const searchStore = defineStore('SearchData', {
  state: () =>
    ({
      movies: null,
      tv: null,
    } as SearchResult),
  getters: {},
  actions: {
    async search(payload: SearchParams) {
      const { searchKey, type } = payload;
      await axios
        .get(
          import.meta.env.VITE_API_BASE_URL +
            'search/' +
            type +
            import.meta.env.VITE_API_KEY +
            '&query=' +
            searchKey
        )
        .then((result) => {
          const dataType = type.split('?')[0];

          dataType === 'movie'
            ? (this.movies = result.data.results)
            : (this.tv = result.data.results);
        });
    },
  },
});
