<template>
  <input
    :type="type"
    @input="debouncedHandler"
  >
</template>

<script setup>
import { onMounted, onUnmounted, toRefs } from "vue";

const { type } = toRefs(props);
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
});
const debouncedHandler = $ref(null);
const emit = defineEmits(["text-change"]);

onMounted(() => {
  debouncedHandler = debounce((e) => {
    emit("text-change", e.target);
  }, 1000);
});

onUnmounted(() => {
  debouncedHandler = debounce(debouncedHandler);
});

function debounce(func, delay) {
  if (!delay) return;
  let timeout;
  // eslint-disable-next-line
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
</script>
