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
      <label>Дата рождения</label>
      <input
        type="date"
        name="birthday"
        :class="{
          inputWrong: valid,
          inputSuccess: isEmptyInput(data.birthday),
        }"
        v-model="data.birthday"
      />
    </div>
    <input type="submit" :class="{ inputWrong: valid, inputSuccess: isEmptyInput(data.birthday) }" />
  </lib-form>
</template>

<script>
import libForm from "../components/lib-form.vue";
import { validInput, isEmptyInput } from "../use/validation.js";
import { ref, reactive } from "vue";
export default {
  components: { libForm },

  setup() {
    const valid = ref(false);
    const data = reactive({
      name: "",
      birthday: "",
    });

    const send = async () => {
      if (validInput(data)) {
        console.log(data);
        await fetch("http://localhost:3000/book/createauthor", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
        });

        data.name.value = "";
        data.birthday.value = "";
        data.books.value = "";

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
