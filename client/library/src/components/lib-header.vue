<template>
  <header class="header">
    <div class="logo">
      <router-link to="/"> Library </router-link>
    </div>
    <ul class="header-list">
      <li class="header-list__item">
        <router-link to="/">Главная</router-link>
      </li>

      <li class="header-list__item">
        <router-link to="/createbook">Добавить книгу</router-link>
      </li>

      <li class="header-list__item">
        <router-link to="/createauthor">Добавить автора</router-link>
      </li>

      <li class="header-list__item">
        <router-link to="/books">Все книги</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  setup() {},
};
</script>

<style></style>
