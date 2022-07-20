<template>
  <div class="p-4 bg-gray-800 font-mono">
    <div
      class="text-white font-semibold text-2xl hover:cursor-pointer"
      @click="handleClick"
    >
      News
    </div>
  </div>
</template>

<script setup>
import { REFRESH_PAGE } from "@/constants";
import useEventsBus from "@/eventbus";

const { emit } = useEventsBus();

function handleClick() {
  emit(REFRESH_PAGE);
}
</script>
