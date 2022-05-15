<template>
  <header class="flex w-full bg-black shadow-md">
    <nav class="relative flex h-20 w-full items-center justify-between px-10">
      <router-link v-slot="{ navigate }" class="flex h-full items-center" to="/">
        <figure class="flex h-full w-16 items-center" @click="navigate">
          <img class="h-auto w-full" src="@/assets/logo.png" alt="moVi" />
        </figure>
      </router-link>
      <div class="relative hidden max-w-[640px] md:block md:w-[440px] lg:w-[640px]">
        <input
          v-model="search"
          class="mt-1 block w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 placeholder-slate-500 shadow-sm placeholder:capitalize focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder="fantastic beasts"
          type="text"
        />
        <div
          class="absolute -bottom-5 left-0 z-50 max-h-96 w-full translate-y-full overflow-y-auto bg-gray-200"
        >
          <template v-if="movieList">
            <div
              v-for="item in movieList"
              :key="item.id"
              class="group flex cursor-pointer items-center justify-start space-x-4 from-primary-default to-indigo-400 px-2 py-3 hover:bg-gradient-to-tr"
              @click="navigateToMedia(item.id, item.original_title)"
            >
              <figure class="w-8">
                <img class="h-auto w-full" :src="imgBaseUrl + item.poster_path" />
              </figure>
              <span
                class="select-none font-raleway text-base font-bold uppercase group-hover:text-white"
              >
                {{ item.original_title }}
              </span>
            </div>
          </template>
          <template v-else>
            <div
              v-for="item in tvList"
              :key="item.id"
              class="group flex cursor-pointer items-center justify-start space-x-4 from-primary-default to-indigo-400 px-2 py-3 hover:bg-gradient-to-tr"
              @click="navigateToMedia(item.id, item.original_name)"
            >
              <figure class="w-8">
                <img class="h-auto w-full" :src="imgBaseUrl + item.poster_path" />
              </figure>
              <span
                class="select-none font-raleway text-base font-bold uppercase group-hover:text-white"
              >
                {{ item.original_name }}
              </span>
            </div>
          </template>
        </div>
      </div>
      <TransitionRoot
        appear
        :show="activeMenu"
        as="template"
        enter="transition ease-out duration-100"
        enter-from="transform opacity-0 scale-95"
        enter-to="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leave-from="transform opacity-100 scale-100"
        leave-to="transform opacity-0 scale-95"
      >
        <div class="absolute top-[80px] left-0 z-50 w-full bg-black px-2 py-4 text-white">
          <input
            v-model="search"
            class="mt-1 block w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 font-raleway font-medium text-slate-900 placeholder-slate-500 shadow-sm placeholder:capitalize focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm md:hidden"
            placeholder="fantastic beasts"
            type="text"
          />
          <div class="absolute"></div>
          <div class="relative mt-4 flex flex-col items-center space-y-2 md:mt-0">
            <div
              class="absolute top-0 left-0 max-h-96 w-full overflow-y-auto bg-gray-200"
            >
              <template v-if="movieList">
                <div
                  v-for="item in movieList"
                  :key="item.id"
                  class="group flex cursor-pointer items-center justify-start space-x-4 from-primary-default to-indigo-400 px-2 py-3 hover:bg-gradient-to-tr"
                  @click="navigateToMedia(item.id, item.original_title)"
                >
                  <figure class="w-8">
                    <img class="h-auto w-full" :src="imgBaseUrl + item.poster_path" />
                  </figure>
                  <span
                    class="select-none font-raleway text-base font-bold uppercase text-black group-hover:text-white"
                  >
                    {{ item.original_title }}
                  </span>
                </div>
              </template>
              <template v-else>
                <div
                  v-for="item in tvList"
                  :key="item.id"
                  class="group flex cursor-pointer items-center justify-start space-x-4 from-primary-default to-indigo-400 px-2 py-3 hover:bg-gradient-to-tr"
                  @click="navigateToMedia(item.id, item.original_name)"
                >
                  <span
                    class="select-none font-raleway text-base font-bold uppercase text-black group-hover:text-white"
                  >
                    {{ item.original_name }}
                  </span>
                </div>
              </template>
            </div>
            <button
              class="flex w-full justify-center py-4 text-center font-medium transition-colors duration-200 hover:bg-slate-600/50 hover:text-primary-light"
              @click="loadRoute('/')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              <span class="pl-2 font-raleway text-lg font-bold uppercase md:text-xl">
                movies
              </span>
            </button>
            <button
              class="flex w-full justify-center py-4 text-center font-medium transition-colors duration-200 hover:bg-slate-600/50 hover:text-primary-light"
              @click="loadRoute('/series')"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 1000 1000"
                xml:space="preserve"
                class="h-6 w-6"
                fill="currentColor"
                stroke="none"
                stroke-width="2"
              >
                <g>
                  <g>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M710.6,323H595.9c0-23.4-18.3-43.9-45.6-55.4l70.5-108.5c1.6,0.3,3.2,0.4,4.9,0.4c16.6,0,30-13.5,30-30c0-16.6-13.5-30-30-30c-16.6,0-30.1,13.5-30.1,30c0,6.1,1.8,11.8,5,16.6l-74.3,114.4c-8.4-1.6-17.2-2.5-26.3-2.5c-9.1,0-18,0.9-26.3,2.5L340.1,54.7c2.9-4.5,4.6-9.9,4.6-15.6c0-16-13-29-29-29s-29,13-29,29c0,16,13,29,29,29c1.5,0,2.9-0.1,4.3-0.4l129.8,199.9c-27.4,11.5-45.6,32-45.6,55.4H289.4c-110.8,0-200.5,89.8-200.5,200.5v220.6c0,93.4,63.9,171.9,150.4,194.2c-0.9,16.3-1.4,51.6,11.8,51.6c11.6,0,30.8-27.6,41.9-45.3h414.2c11.1,17.7,30.3,45.3,41.9,45.3c13.1,0,12.7-35.3,11.7-51.6c86.5-22.3,150.4-100.8,150.4-194.2V523.5C911.1,412.8,821.3,323,710.6,323z M669.7,827.5H225.4c-21.8,0-39.4-17.6-39.4-39.4V479.8c0-21.8,17.6-39.4,39.4-39.4h444.3c21.8,0,39.4,17.6,39.4,39.4v308.3C709.1,809.9,691.4,827.5,669.7,827.5z M792.9,757.5c-25.8,0-46.6-20.9-46.6-46.6s20.9-46.6,46.6-46.6c25.8,0,46.6,20.9,46.6,46.6S818.7,757.5,792.9,757.5z M792.9,576.9c-25.8,0-46.6-20.9-46.6-46.6c0-25.8,20.9-46.6,46.6-46.6c25.8,0,46.6,20.9,46.6,46.6C839.5,556.1,818.7,576.9,792.9,576.9z"
                    />
                  </g>
                </g>
              </svg>
              <span class="pl-2 font-raleway text-lg font-bold uppercase md:text-xl">
                tv show
              </span>
            </button>
          </div>
        </div>
      </TransitionRoot>
      <button
        class="icon relative m-2.5 inline h-[30px] w-[30px] cursor-pointer outline-none transition-all duration-100"
        :class="{ open: activeMenu }"
        @click="toggleMenu"
      >
        <span class="dots"></span>
        <span class="dots"></span>
        <span class="dots"></span>
        <span class="dots"></span>
        <span class="dots"></span>
        <span class="dots"></span>
        <span class="dots"></span>
        <span class="dots"></span>
        <span class="dots"></span>
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { TransitionRoot } from '@headlessui/vue';
  import { searchStore } from '@/store/Search';

  const store = searchStore();
  const route = useRoute();
  const router = useRouter();

  const activeMenu = ref(false);
  const search = ref('');
  const imgBaseUrl = computed(() => import.meta.env.VITE_IMAGE_URL + 'w92');

  const type = computed(() => {
    const { name } = route;
    return name === 'Movie' ? 'movie' : 'tv';
  });

  const movieList = computed(() => {
    return store.movies;
  });
  const tvList = computed(() => {
    return store.tv;
  });

  function toggleMenu() {
    activeMenu.value = !activeMenu.value;
    store.movies = null;
    store.tv = null;
  }

  function loadRoute(route: string) {
    console.log(route);
    router.push({ path: route });
    activeMenu.value = false;
  }

  function navigateToMedia(id: number, name: string) {
    search.value = name;
    router.push({ name: 'Media', params: { id } });
    store.movies = null;
    store.tv = null;
  }

  //watch search value and call function after delay
  watch(search, (value) => {
    if (value.length > 2) {
      setTimeout(() => {
        const typeQuery = type.value + '?';
        const data = {
          searchKey: value,
          type: typeQuery,
        };
        store.search(data);
      }, 1000);
    }
  });
</script>

<style scoped>
  .icon span:nth-child(1) {
    left: 0;
    top: 0;
  }
  .icon span:nth-child(2) {
    left: 12px;
    top: 0;
  }
  .icon span:nth-child(3) {
    right: 0;
    top: 0;
  }
  .icon span:nth-child(4) {
    left: 0;
    top: 12px;
  }
  .icon span:nth-child(5) {
    position: absolute;
    left: 12px;
    top: 12px;
  }
  .icon span:nth-child(6) {
    right: 0px;
    top: 12px;
  }
  .icon span:nth-child(7) {
    left: 0px;
    bottom: 0px;
  }
  .icon span:nth-child(8) {
    position: absolute;
    left: 12px;
    bottom: 0px;
  }
  .icon span:nth-child(9) {
    right: 0px;
    bottom: 0px;
  }
  .icon.open {
    transform: rotate(180deg);
    cursor: pointer;
    transition: 0.2s cubic-bezier(0.8, 0.5, 0.2, 1.4);
  }
  .icon.open span {
    border-radius: 50%;
    transition-delay: 200ms;
    transition: 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4);
  }
  .icon.open span:nth-child(2) {
    left: 6px;
    top: 6px;
  }
  .icon.open span:nth-child(4) {
    left: 6px;
    top: 18px;
  }
  .icon.open span:nth-child(6) {
    right: 6px;
    top: 6px;
  }
  .icon.open span:nth-child(8) {
    left: 18px;
    bottom: 6px;
  }
</style>
