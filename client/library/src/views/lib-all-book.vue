<template>
  <div v-if="store.getters['book/books'].length">
    <div class="cards">
      <div
        class="card"
        v-for="book in store.getters['book/books']"
        :key="book._id"
      >
        <div class="card-author">
          <h1>Автор:</h1>
          <p>{{ book.author }}</p>
        </div>
        <div class="card-name" :key="book._id">
          <h2>Название:</h2>
          <p>{{ book.name }}</p>
        </div>
        <div class="card-ganre" v-for="ganre in book.ganre" :key="ganre">
          <h3>Жанр:</h3>
          <p>{{ ganre }}</p>
        </div>
        <div class="card-descr">
          <h4>О книге:</h4>
          <p>{{ book.descr }}</p>
        </div>
        <router-link :to="`/book/${book._id}`"> Открыть</router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Books not found</h1>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    onMounted(() => store.dispatch("book/getBooks"));
    return {
      store,
    };
  },
};
</script>

<style></style>
