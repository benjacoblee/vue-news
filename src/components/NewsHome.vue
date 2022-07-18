<template>
  <NavBar />
  <div class="container mx-auto mt-8 font-mono">
    <NewsInput
      type="text"
      @text-change="handleChange"
    />
    <div
      v-if="loading && !error"
      class="flex justify-center"
    >
      <TailwindSpinner />
    </div>
    <div v-if="error && !articlesData.results">
      {{ error }}
    </div>
    <div
      v-for="article in articlesData.results"
      :key="article.link"
    >
      <ArticleCard :data="article" />
    </div>
    <div
      v-if="shouldRenderPagination"
      class="text-center m-8"
    >
      <span
        v-if="page !== 0"
        :id="page - 1"
        @click="handlePageChange($event)"
      >Prev</span>
      <span v-if="page !== 0"> - </span>
      <span
        v-if="articlesData.nextPage"
        :id="page"
        @click="handlePageChange($event)"
      >Next</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import axios from "axios";
import NavBar from "./NavBar.vue";
import TailwindSpinner from "./TailwindSpinner.vue";
import NewsInput from "./NewsInput.vue";
import ArticleCard from "./ArticleCard.vue";
import { generateURL } from "../utils";

const articlesData = $ref({});
const searchTerm = $ref("");
const loading = $ref(true);
const page = $ref(0);
const error = $ref("");

const shouldRenderPagination = computed(() => articlesData?.nextPage && !loading);

onMounted(() => {
  axios
    .get("/api")
    .then(({ data }) => {
      loading = false;
      articlesData = data;
    })
    .catch(({ response: { status } }) => {
      loading = false;

      if (status === 500) error = "Server error. Try again later.";
      if (status === 400) error = "Request failed. Try again later.";
    });
});

function handleChange({ value }) {
  articlesData = {};
  loading = true;
  searchTerm = value;
  page = 0;
  error = "";

  const url = generateURL({ val: searchTerm, page });

  axios
    .get(url)
    .then(({ data }) => {
      loading = false;

      if (!data.results?.length) {
        error = `No match for "${value}"`;
        return;
      }

      articlesData = data;
    })
    .catch(({ response: { data, status } }) => {
      if (status === 500) {
        return (error = "Server error. Try again later");
      }
      error = data;
    });
}

function handlePageChange({ target: { innerHTML, id } }) {
  articlesData = {};
  loading = true;

  if (innerHTML === "Next") {
    page = id++;
  }
  page = id--;

  const url = generateURL({ val: searchTerm, page });

  axios.get(url).then(({ data }) => {
    loading = false;
    articlesData = data;
  });
}
</script>
