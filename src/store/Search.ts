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
      movies: [],
      tv: [],
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
            searchKey +
            '&language=en-US&page=1&include_adult=false'
        )
        .then((result) => {
          this.movies = [];
          this.tv = [];

          if (type === 'media') {
            result.data.results.filter((item: any) => {
              if (item.media_type === 'tv') {
                this.tv.push(item);
              } else {
                this.movies.push(item);
              }
            });
          }

          type === 'movie'
            ? (this.movies = result.data.results)
            : (this.tv = result.data.results);
        });
    },
  },
});
