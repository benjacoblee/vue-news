<template>
  <div class="xs:w-10/12 w-full mx-auto mb-2">
    <input
      class="border-b-2 border-gray-200 text-2xl lg:text-5xl text-gray-600 outline-none mb-4"
      placeholder="Search"
      :type="type"
      @input="debouncedHandler"
    />
  </div>
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
