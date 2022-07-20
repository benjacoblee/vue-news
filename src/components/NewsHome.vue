<template>
  <NavBar />
  <div class="container mx-auto mt-8 font-mono">
    <NewsInput type="text" @text-change="handleNewsInputChange" />
    <div v-if="loading && !error" class="flex justify-center">
      <TailwindSpinner />
    </div>
    <div v-if="error && !articlesData.results">
      {{ error }}
    </div>
    <HashTags v-if="!loading && !error" :categories="CATEGORIES" />
    <div v-for="article in articlesData.results" :key="article.link">
      <ArticleCard :data="article" />
    </div>
    <div v-if="shouldRenderPagination" class="text-center m-8">
      <span v-if="page !== 0" :id="page - 1" @click="handlePageChange($event)">Prev</span>
      <span v-if="page !== 0"> - </span>
      <span v-if="articlesData.nextPage" :id="page" @click="handlePageChange($event)"
        >Next</span
      >
    </div>
  </div>
</template>

<script setup>
import useEventsBus from "@/eventbus";
import { computed, onMounted, watch } from "vue";
import axios from "axios";
import NavBar from "./NavBar.vue";
import TailwindSpinner from "./TailwindSpinner.vue";
import NewsInput from "./NewsInput.vue";
import ArticleCard from "./ArticleCard.vue";
import HashTags from "./HashTags.vue";
import { generateURL, queryOptions } from "../utils";
import { SEARCH, CATEGORY, SELECT_CATEGORY, CATEGORIES } from "../constants";

const articlesData = $ref({});
const searchTerm = $ref("");
const searchCategory = $ref("");
const loading = $ref(true);
const page = $ref(0);
const error = $ref("");

const { bus } = useEventsBus();
const shouldRenderPagination = computed(() => articlesData?.nextPage && !loading);

watch(
  () => bus.value.get(SELECT_CATEGORY),
  (value) => handleCategorySelect(value)
);

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

function handleNewsInputChange(term) {
  articlesData = {};
  loading = true;
  searchTerm = term;
  searchCategory = "";
  page = 0;
  error = "";

  const url = generateURL({ val: searchTerm, page, type: SEARCH });

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

function handleCategorySelect(category) {
  articlesData = {};
  loading = true;
  searchCategory = category;
  searchTerm = "";
  page = 0;
  error = "";

  const url = generateURL({ val: searchCategory, page, type: CATEGORY });

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

  const { val, type } = queryOptions({ searchTerm, searchCategory });

  const url = generateURL({
    val,
    page,
    type,
  });

  axios.get(url).then(({ data }) => {
    loading = false;
    articlesData = data;
  });
}
</script>
