<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getPageTitle from "@/utils/get-page-title";

export default {
  name: "App",
  // 动态网页标题
  metaInfo() {
    return {
      title: getPageTitle(this.dynamicTitle && this.pageTitle)
    };
  },
  computed: {
    ...mapGetters(["dynamicTitle", "pageTitle"])
  }
};
</script>
