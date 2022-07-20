<template>
  <div
    v-for="category in categories"
    :key="category"
    class="text-gray-500 inline-block mr-4 mb-4 hover:cursor-pointer"
    :class="category === searchCategory && 'underline'"
    @click="handleClick(category)"
  >
    #{{ category }}
  </div>
</template>
<script setup>
import useEventsBus from "@/eventbus";
import { SELECT_CATEGORY } from "../constants";
const { emit } = useEventsBus();

const props = defineProps({
  categories: {
    type: Array,
    default() {
      return [];
    },
  },
  searchCategory: {
    type: String,
    default: "",
  },
});

function handleClick(category) {
  emit(SELECT_CATEGORY, category);
}
</script>
