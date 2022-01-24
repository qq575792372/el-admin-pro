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
    ...mapGetters(["name", "sidebarRoutes"])
  },
  created() {
    const menuData = this.getMenuData(this.sidebarRoutes, []);
    console.log("生成：", menuData);
  },
  methods: {
    getMenuData(list, basePath = "") {
      const res = [];
      for (let v of list) {
        if (v.path == "/" || v.path == "*" || v.hidden) continue;
        v.flag = true;
        v.fullpath = (basePath ? basePath + "/" : "") + v.path;
        if (v.children && v.children.length > 0) {
          v.children = this.getMenuData(v.children, v.fullpath);
        } else {
          delete v.children;
          delete v.flag;
        }
        res.push(v);
      }
      return res;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 400px;
  overflow: auto;
}
</style>
