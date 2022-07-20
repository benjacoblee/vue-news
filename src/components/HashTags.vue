<template>
  <div
    v-for="category in categories"
    :key="category"
    class="text-gray-500 inline-block mr-4 mb-4 hover:cursor-pointer"
    @click="handleClick(category)"
  >
    #{{ category }}
  </div>
</template>
<script setup>
import useEventsBus from "@/eventbus";
import { SELECT_CATEGORY } from "../constants";
const { emit } = useEventsBus();

defineProps({
  categories: {
    type: Array,
    default() {
      return [];
    },
  },
});

function handleClick(category) {
  emit(SELECT_CATEGORY, category);
}
</script>
