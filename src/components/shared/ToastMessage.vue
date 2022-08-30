<template>
  <NotificationGroup group="notify" position="top">
    <div
      class="pointer-events-none fixed inset-x-0 bottom-0 flex items-start justify-end p-6 px-4 py-6"
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="mx-auto mt-4 flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div
              class="flex w-12 items-center justify-center"
              :class="notification.title === 'success' ? 'bg-green-500' : 'bg-red-500'"
            >
              <svg
                v-if="notification.title !== 'success'"
                class="h-6 w-6 fill-current text-white"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
                ></path>
              </svg>
              <svg
                v-else
                class="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div class="-mx-3 px-4 py-2">
              <div class="mx-3">
                <span
                  class="font-semibold capitalize"
                  :class="
                    notification.title === 'success' ? 'text-green-500' : 'text-red-500'
                  "
                >
                  {{ notification.title }}
                </span>
                <p class="text-sm text-gray-600">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>
