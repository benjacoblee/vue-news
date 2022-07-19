<template>
  <span
    v-for="category in categories"
    :key="category"
    class="text-gray-500"
  >
    #{{ category }}
  </span>
</template>
<script setup>
defineProps({
  categories: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>
