<template>
  <footer
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <div
        class="relative inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
        :class="[store.page === 1 ? 'opacity-40' : 'hover:bg-gray-50']"
        @click="prevPage"
      >
        Previous
      </div>
      <div
        class="relative ml-3 inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        :class="{ 'hover:bg-gray-50': store.page === 1 }"
        @click="nextPage"
      >
        Next
      </div>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ store.fromStart }}</span>
          to
          <span class="font-medium">{{ store.toEnd }}</span>
          of
          <span class="font-medium">{{ store.total_results }}</span>
          results
        </p>
      </div>
      <div>
        <nav aria-label="Page navigation">
          <ul class="inline-flex space-x-1">
            <li>
              <button
                class="focus:shadow-outline flex h-10 w-10 items-center justify-center rounded-full text-indigo-600 transition-colors duration-150 hover:bg-indigo-100"
                @click="prevPage"
              >
                <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            <li v-for="page in store.activePageSection" :key="page">
              <button
                :class="[
                  page === store.page
                    ? 'border border-r-0 border-indigo-600 bg-indigo-600 text-white'
                    : 'bg-indigo-100 text-indigo-600',
                ]"
                class="focus:shadow-outline h-10 w-10 rounded-full transition-colors duration-150"
                @click="setActivePage(page)"
              >
                {{ page }}
              </button>
            </li>

            <li>
              <button
                class="focus:shadow-outline flex h-10 w-10 items-center justify-center rounded-full bg-white text-indigo-600 transition-colors duration-150 hover:bg-indigo-100"
                @click="nextPage"
              >
                <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { pagination } from '@/store/PageInfo';
  import { useRouter } from 'vue-router';

  const store = pagination();
  const router = useRouter();

  const prevPage = () => {
    if (store.page > 1) {
      store.page--;
      router.push({
        name: router.currentRoute.value.name,
        query: { page: store.page },
      });
    }
  };
  const setActivePage = (page: number) => {
    store.page = page;
    router.push({
      name: router.currentRoute.value.name,
      query: { page: store.page },
    });
  };

  const nextPage = () => {
    if (store.page < store.total_pages) {
      store.page++;
      router.push({
        name: router.currentRoute.value.name,
        query: { page: store.page },
      });
    }
  };
</script>
