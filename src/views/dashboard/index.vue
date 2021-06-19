<template>
  <div class="app-container">
    <div class="font-20 text-bold">欢迎 {{ name }} 登录！</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 400px;
  overflow: auto;
}
</style>
