import { ref, onMounted, onUnmounted, computed } from 'vue';

export default function () {
  const height = ref<number>(null);
  const width = ref<number>(null);

  onMounted(() => {
    resize();
    window.addEventListener('resize', resize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
  });

  function resize() {
    height.value = window.innerHeight;
    width.value = window.innerWidth;
  }

  const isPortrait = computed(() => height.value > width.value && width.value < 760);

  return {
    isPortrait,
    height,
    width,
  };
}
