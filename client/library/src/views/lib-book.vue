<template>
  <div class="cards">
    <div class="card">
      <div class="book-author">
        <h1>Автор:</h1>
        <div>{{ book.author }}</div>
      </div>
      <div class="card-name" :key="book._id">
        <h2>Название:</h2>
        <div v-if="!edit">{{ book.name }}</div>
        <div v-else>
          <input type="text" v-model="newData.name" name="name" />
        </div>
      </div>
      <div class="card-ganre" v-for="ganre in book.ganre" :key="ganre">
        <h3>Жанр:</h3>
        <div>{{ ganre }}</div>
      </div>
      <div class="book-descr">
        <h4>О книге:</h4>
        <div v-if="!edit">{{ book.descr }}</div>
        <div v-else>
          <textarea name="descr" v-model="newData.descr"></textarea>
        </div>
      </div>
      <button @click="remove(book)">Удалить</button>

      <button @click="edit = !edit" v-if="!edit">Изменить</button>
      <button @click="save(book._id)" v-else>Сохранить</button>
    </div>

    <h1>Добавить файл</h1>
    <form
      class="form"
      :action="`http://localhost:3000/upload/${book._id}`"
      method="post"
      enctype="multipart/form-data"
    >
      <label>файл</label>
      <input type="file" name="filedata" />
      <input type="submit" value="Отправить" />
    </form>
    <a
      :href="`http://localhost:3000/book/downloadbook/${book._id}/${book.name
        .split(' ')
        .join('')}`"
      >Скачать</a
    >
  </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const edit = ref(false);
    const book = computed(() => store.getters["book/book"]);

    const newData = reactive({
      name: "",
      descr: "",
    });

    store.dispatch("book/getBook", route.params.id);

    const remove = (book) => {
      store.dispatch("book/removeBook", book);
      router.push("/books");
    };

    const save = (id) => {
      store.dispatch("book/changeBook", {
        data: {
          name: newData.name === "" ? book.value.name : newData.name,
          descr: newData.descr === "" ? book.value.descr : newData.descr,
          id: id,
        },
      });
      edit.value = !edit.value;
      store.dispatch("book/getBook", route.params.id);
    };

    return {
      book,
      remove,
      edit,
      save,
      newData,
      router,
    };
  },
};
</script>

<style></style>
