<template>
  <form @submit.prevent="$emit('sendForm')" class="form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  setup() {},
};
</script>

<style></style>
