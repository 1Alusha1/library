<template>
  <div v-if="store.getters['book/book'].length">
    <ul class="lib-list">
      <li
        @click="remove(item._id)"
        class="lib-list__item"
        v-for="item in store.getters['book/book']"
        :key="item._id"
      >
        {{ item }}
      </li>
    </ul>
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

    const remove = (a) => {
      console.log(a);
    };
    const update = (a) => {
      console.log(a);
    };
    return {
      store,
      remove,
      update,
    };
  },
};
</script>

<style></style>
