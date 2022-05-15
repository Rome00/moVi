import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { pagination } from '@/store/PageInfo';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Movie',

    component: () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue'),
  },
  {
    path: '/series',
    name: 'TV',
    component: () => import(/* webpackChunkName: "home" */ '../views/SeriesPage.vue'),
  },
  {
    path: '/media/:id',
    name: 'Media',
    component: () => import(/* webpackChunkName: "home" */ '../views/MediaPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  const pageInfo = pagination();

  if (to.query.page && to.name !== 'Media') {
    console.log('fire', to);
    pageInfo.page = parseInt(to.query.page as string);
    next();
  } else if (to.name !== 'Media') {
    next({ name: to.name, query: { page: 1 } });
  } else {
    next();
  }
});

export default router;
