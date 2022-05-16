<template>
  <TransitionRoot
    :show="currentSlide === index"
    appear
    as="template"
    enter="transition-opacity duration-1000"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-700"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div
      class="absolute inset-0"
      @mouseenter="$emit('mouseenter')"
      @mouseout="$emit('mouseout')"
    >
      <div
        class="bg-position relative h-full bg-cover bg-no-repeat"
        :class="computedBgClass"
        :style="{
          backgroundImage: 'url(' + imageUrl + slide.backdrop_path + ')',
        }"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"
        ></div>
        <div class="absolute bottom-[20%] left-[5%] z-30">
          <h3 class="font-playfair max-w-lg text-4xl font-semibold text-primary-default">
            {{ slide.title }}
          </h3>
          <p class="font-playfair max-w-lg text-base font-semibold text-white">
            {{ truncate(slide.overview, 120) }}
          </p>
          <div class="mt-4 flex items-center">
            <div class="flex items-center font-raleway text-2xl font-medium text-white">
              <span class="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </span>
              <span class="mb-1 ml-1">{{ slide.vote_average }}</span>
            </div>
          </div>
          <router-link
            v-slot="{ href, navigate }"
            custom
            :to="{ name: 'media', params: { id: slide.id, media: $route.name } }"
          >
            <button
              :href="href"
              class="mt-4 min-w-[150px] rounded-full bg-indigo-400 px-4 py-2 font-medium capitalize"
              @click="navigate"
            >
              details
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { TransitionRoot } from '@headlessui/vue';
  import { useRoute } from 'vue-router';
  import { Slide } from '@/interfaces/Root';

  export default defineComponent({
    components: { TransitionRoot },
    props: {
      slide: {
        type: Object as PropType<Slide>,
        required: true,
      },
      currentSlide: {
        type: Number,
        default: 0,
      },
      index: {
        type: Number,
        default: 0,
      },
      direction: {
        type: String,
        default: 'right',
      },
    },
    emits: ['mouseenter', 'mouseout'],
    setup(props) {
      const route = useRoute();
      const imageUrl = import.meta.env.VITE_IMAGE_URL + 'w1280';
      const transitionEffect = computed(() => {
        return props.direction === 'right' ? 'slide-out' : 'slide-in';
      });

      const truncate = (str: string, maxLength: number): string => {
        if (str.length > maxLength) {
          return str.substring(0, maxLength) + '...';
        }
        return str;
      };
      const computedBgClass = computed(() =>
        route.name === 'movie' ? 'bg-center' : 'bg-top'
      );
      

      return {
        imageUrl,
        computedBgClass,
        transitionEffect,

        // methods
        truncate,
      };
    },
  });
</script>
