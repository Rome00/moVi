import { pagination } from '@/store/PageInfo';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'movie',

    component: () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue'),
  },
  {
    path: '/series',
    name: 'tv',
    component: () => import(/* webpackChunkName: "series" */ '../views/SeriesPage.vue'),
  },
  {
    path: '/media/:media/:id',
    name: 'media',
    component: () => import(/* webpackChunkName: "media" */ '../views/MediaPage.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserPage.vue'),
    beforeEnter: async (to, from, next) => {
      console.log(await getCurrentUser());

      if (await getCurrentUser()) {
        next();
      } else {
        next({ name: 'movie' });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  const pageInfo = pagination();

  if (to.query.page && to.name !== 'media') {
    pageInfo.page = parseInt(to.query.page as string);
    next();
  } else if (to.name !== 'media') {
    next({ name: to.name, query: { page: 1 } });
  } else {
    next();
  }
});

export default router;
