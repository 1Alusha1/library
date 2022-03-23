<template>
  <lib-form @sendForm="send">
    <div class="form-item">
      <label>Имя</label>
      <input
        type="text"
        name="name"
        :class="{ inputWrong: valid, inputSuccess: isEmptyInput(data.name) }"
        v-model="data.name"
      />
    </div>
    <div class="form-item">
      <label>Жанр</label>
      <input
        type="text"
        name="ganre"
        :class="{ inputWrong: valid, inputSuccess: isEmptyInput(data.ganre) }"
        v-model="data.ganre"
      />
    </div>
    <div class="form-item">
      <label>Автор</label>
      <input
        type="text"
        name="author"
        :class="{ inputWrong: valid, inputSuccess: isEmptyInput(data.author) }"
        v-model="data.author"
      />
    </div>
    <div class="form-item">
      <label>Описание</label>
      <input
        type="text"
        name="descr"
        :class="{ inputWrong: valid, inputSuccess: isEmptyInput(data.descr) }"
        v-model="data.descr"
      />
    </div>
    <input
      type="submit"
      :class="{ inputWrong: valid, inputSuccess: isEmptyInput(data.descr) }"
    />
  </lib-form>
</template>

<script>
import libForm from "../components/lib-form.vue";
import { validInput, isEmptyInput } from "../use/validation.js";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
export default {
  components: { libForm },

  setup() {
    const store = useStore();
    const valid = ref(false);
    const data = reactive({
      name: "",
      ganre: "",
      author: "",
      descr: "",
    });
    const send = async () => {
      if (validInput(data)) {
        store.dispatch("book/createbdNote", { data: data, method: "book" });

        data.name = "";
        data.ganre = "";
        data.author = "";
        data.descr = "";

        valid.value = false;
      } else {
        valid.value = true;
      }
    };

    return {
      data,
      valid,
      send,
      isEmptyInput,
    };
  },
};
</script>

<style>
.inputWrong {
  border-color: red;
}
</style>
