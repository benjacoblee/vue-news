<template>
  <NewsHome :key="key" />
</template>

<script setup>
import { watch } from "vue";
import useEventsBus from "./eventbus";
import NewsHome from "./components/NewsHome.vue";

const { bus } = useEventsBus();
const key = $ref(0);

watch(
  () => bus.value.get("refreshPage"),
  () => key++
);
</script>
