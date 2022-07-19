<template>
  <div class="xs:w-10/12 w-full mx-auto mb-2">
    <div
      class="border-t border-r border-b border-l border-gray-400 flex leading-normal p-2"
    >
      <div
        v-if="data.image_url && imageValid"
        class="xs:hidden md:hidden lg:block max-w-md mr-4"
      >
        <img :src="data.image_url" @error="handleImageError" />
      </div>
      <div :class="data.image_url ? 'max-w-3xl' : 'max-w-7xl'" class="mb-4">
        <div class="text-gray-900 font-bold xs:text-base text-xl mb-2">
          <a :href="data.link">{{ data.title }}</a>
        </div>
        <p v-if="data.description" class="text-gray-700 xs:text-sm text-base">
          {{ truncateDesc(data.description) }}
          <span class="text-gray-500 underline">
            <a :href="data.link">Read more</a>
          </span>
        </p>
        <HashTags :categories="data.category" />
      </div>
    </div>
  </div>
</template>

<script setup>
import HashTags from "./HashTags.vue";
import { truncateDesc } from "../utils";

const imageValid = $ref(true);

function handleImageError() {
  imageValid = false;
}

defineProps({
  data: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>
