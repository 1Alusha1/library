<template>
  <div class="warp">
    <lib-header />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import libHeader from "./components/lib-header.vue";
export default {
  components: { libHeader },
};
</script>
