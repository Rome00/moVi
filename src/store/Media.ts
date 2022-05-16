import { defineStore } from 'pinia';
import axios from 'axios';
import { MediaItems } from '@/interfaces/Root';
import { pagination } from './PageInfo';

interface MediaPayload {
  id: number;
  type: string;
}

export const MediaStore = defineStore('MediaStore', {
  state: () =>
    ({
      Movie: null,
      tvSeries: null,
    } as MediaItems),
  actions: {
    async loadMediaInfo(payload: MediaPayload) {
      const pageInfo = pagination();
      pageInfo.loading = true;

      const { id, type } = payload;
      const certificateQuery = type === 'movie' ? 'release_dates' : 'content_ratings';
      await axios
        .get(
          import.meta.env.VITE_API_BASE_URL +
            type +
            '/' +
            id +
            '?' +
            import.meta.env.VITE_API_KEY +
            '&append_to_response=' +
            certificateQuery +
            ',credits,images'
        )
        .then((result) => {
          type === 'movie' ? (this.Movie = result.data) : (this.tvSeries = result.data);
          pageInfo.loading = false;
        });
    },
  },
});
