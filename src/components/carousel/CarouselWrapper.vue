<template>
  <div class="relative block" :class="[height]">
    <div class="flex h-full overflow-x-hidden">
      <carousel-item
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="flex-shrink-0"
        :slide="slide"
        :current-slide="currentSlide"
        :index="index"
        :direction="direction"
        @mouseenter="stopSlideTimer"
        @mouseout="startSlideTimer"
      ></carousel-item>
    </div>
    <carousel-indicators
      v-if="indicators"
      :total="slides.length"
      :current-index="currentSlide"
      @switch="switchSlide($event)"
    ></carousel-indicators>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, PropType, onMounted, onUnmounted, computed } from 'vue';
  import { BaseMovie } from '@/interfaces/Movie';
  import { BaseTv } from '@/interfaces/Tv';
  import { Slide } from '@/interfaces/Root';
  import CarouselItem from './CarouselItem.vue';
  import CarouselIndicators from './CarouselIndicators.vue';

  export default defineComponent({
    components: { CarouselItem, CarouselIndicators },
    props: {
      movies: {
        type: Array as PropType<Array<BaseMovie>>,
        default: undefined,
      },
      series: {
        type: Array as PropType<Array<BaseTv>>,
        default: undefined,
      },
      indicators: {
        type: Boolean,
        default: false,
      },
      interval: {
        type: Number,
        default: 5000,
      },
      height: {
        type: String,
        default: 'h-[600px]',
      },
    },
    setup(props) {
      let currentSlide = ref(0);
      let slideInterval = ref(null);
      let direction = ref('right');

      // methods

      const setCurrentSlide = (index: number) => {
        currentSlide.value = index;
      };

      const slides = computed<Slide[]>(() => {
        if (props.movies) {
          return props.movies.map((x) => {
            return {
              id: x.id,
              overview: x.overview,
              vote_average: x.vote_average,
              title: x.original_title,
              backdrop_path: x.backdrop_path,
            };
          });
        }
        return props.series.map((x) => {
          return {
            id: x.id,
            overview: x.overview,
            vote_average: x.vote_average,
            title: x.original_name,
            backdrop_path: x.backdrop_path,
          };
        });
      });
      const prev = (step = -1) => {
        const index =
          currentSlide.value > 0 ? currentSlide.value + step : slides.value.length - 1;
        setCurrentSlide(index);
        direction.value = 'left';
        startSlideTimer();
      };

      const next = (step = 1) => {
        const index =
          currentSlide.value < slides.value.length - 1 ? currentSlide.value + step : 0;
        setCurrentSlide(index);
        direction.value = 'right';
      };

      const nextItem = (step = 1) => {
        next(step);
        startSlideTimer();
      };

      const startSlideTimer = () => {
        stopSlideTimer();
        slideInterval = setInterval(() => {
          next();
        }, props.interval);
      };

      const stopSlideTimer = () => {
        clearInterval(slideInterval);
      };

      const switchSlide = (index: number) => {
        const step = index - currentSlide.value;
        if (step > 0) {
          nextItem(step);
        } else {
          prev(step);
        }
      };

      onMounted(() => startSlideTimer());
      onUnmounted(() => stopSlideTimer());

      return {
        slides,
        direction,
        currentSlide,

        setCurrentSlide,
        startSlideTimer,
        stopSlideTimer,
        switchSlide,
      };
    },
  });
</script>
