<template>
  <div class="cards">
    <div class="card">
      <div class="card-author">
        <h1>Автор:</h1>
        <p>{{ book.author }}</p>
      </div>
      <div class="card-name" :key="book._id">
        <h2>Название:</h2>
        <p v-if="!edit">{{ book.name }}</p>
        <div v-else>
          <input
            type="text"
            :class="{
              inputWrong: valid,
              inputSuccess: isEmptyInput(newData.name),
            }"
            v-model="newData.name"
            name="name"
          />
        </div>
      </div>
      <div class="card-ganre" v-for="ganre in book.ganre" :key="ganre">
        <h3>Жанр:</h3>
        <p>{{ ganre }}</p>
      </div>
      <div class="book-descr">
        <h4>О книге:</h4>
        <p v-if="!edit">{{ book.descr }}</p>
        <div v-else>
          <textarea
            name="descr"
            :class="{
              inputWrong: valid,
              inputSuccess: isEmptyInput(newData.descr),
            }"
            v-model="newData.descr"
          ></textarea>
        </div>
      </div>
      <button class="btn mr-10" @click="remove(book)">Удалить</button>
      <button class="btn" @click="edit = !edit" v-if="!edit">Изменить</button>
      <button class="btn" @click="save(book._id)" v-else>Сохранить</button>
    </div>

    <h1 class="addFile">Добавить файл</h1>
    <form
      class="form"
      :action="`http://localhost:3000/upload/${book._id}`"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="form-item">
        <label for="file-upload" class="custom-file-upload">файл</label>
        <input type="file" id="file-upload" name="filedata" />
      </div>
      <div class="form-item">
        <input type="submit" value="Отправить" />
      </div>
    </form>
    <a class="download-link"
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
import { isEmptyInput } from "../use/validation";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const valid = ref(false);
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
      isEmptyInput,
      valid,
    };
  },
};
</script>

<style></style>
