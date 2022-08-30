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
                <hr class="mt-8 mb-4" />
                <div class="flex justify-center">
                  <button
                    class="flex rounded-lg bg-indigo-600 px-2.5 py-2 text-black"
                    @click="signInWithGoogle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      class="h-6 w-6"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                  </button>
                </div>
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
  function signInWithGoogle() {
    store.googleLogin();
  }
  function signUp() {
    store.register(signupForm);
  }
</script>

<style scoped></style>
