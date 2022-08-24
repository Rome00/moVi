<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
    >
      <div
        class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
      >
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <TabGroup>
            <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              <Tab v-slot="{ selected }" as="template">
                <button
                  :class="[
                    'w-full rounded-lg py-2.5 text-sm font-medium capitalize leading-5 text-indigo-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                  ]"
                >
                  sign in
                </button>
              </Tab>
              <Tab v-slot="{ selected }" as="template">
                <button
                  :class="[
                    'w-full rounded-lg py-2.5 text-sm font-medium capitalize leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                  ]"
                >
                  sign up
                </button>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <form class="space-y-4 md:space-y-6" @submit.prevent="signIn">
                  <div>
                    <label
                      for="email"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      id="email"
                      v-model="loginForm.email"
                      type="email"
                      name="email"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      v-model="loginForm.password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Sign in
                  </button>
                </form>
              </TabPanel>
              <TabPanel>
                <form class="space-y-4 md:space-y-6" @submit.prevent="signUp">
                  <div>
                    <label
                      for="email"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      id="email"
                      v-model="signupForm.email"
                      type="email"
                      name="email"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="userName"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your user name
                    </label>
                    <input
                      id="user"
                      v-model="signupForm.userName"
                      type="text"
                      name="user"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="userName"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      v-model="signupForm.password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Sign up
                  </button>
                </form>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { logIn, user } from '@/interfaces/User';
  import { useUserStore } from '@/store/User';
  import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';
  import { reactive } from 'vue';

  const loginForm = reactive<logIn>({
    email: '',
    password: '',
  });
  const signupForm = reactive<user>({
    email: '',
    password: '',
    userName: '',
  });

  const store = useUserStore();
  function signIn() {
    store.login(loginForm);
  }
  function signUp() {
    store.register(signupForm);
  }
</script>

<style scoped></style>