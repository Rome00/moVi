import { defineStore } from 'pinia';
import { pageInfo } from '@/interfaces/Root';

export const pagination = defineStore('pagination', {
  state: () =>
    ({
      loading: true,
      page: 1,
      total_pages: null,
      total_results: null,
    } as pageInfo),
  getters: {
    fromStart: (state) => (state.page - 1) * 20,
    toEnd: (state) => (state.page - 1) * 20 + 20,
    loadingState: (state) => state.loading,
    activePageSection() {
      const pageList: number[] = [];
      const start: number = this.page - 3;
      const end = this.page + 3;

      const rangeStart: number = start > 0 ? start : 1;
      const rangeEnd: number = this.total_pages ? end : this.total_pages;

      for (let i = rangeStart; i <= rangeEnd; i++) {
        pageList.push(i);
      }
      return pageList;
    },
  },
});
