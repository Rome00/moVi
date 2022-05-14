import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Movie',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import(/* webpackChunkName: "home" */ '../views/TvSeries.vue'),
  },
  {
    path: '/media/:id',
    name: 'Media',
    component: () => import(/* webpackChunkName: "home" */ '../views/Media.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

export default router;
