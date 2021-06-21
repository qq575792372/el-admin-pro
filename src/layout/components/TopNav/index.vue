<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    @select="handleSelect"
  >
    <template v-for="(item, index) in topMenus">
      <el-menu-item
        :style="{ '--theme': theme }"
        :index="item.path"
        :key="index"
        v-if="index < visibleNumber"
      >
        <!-- 兼容svg图片和el-icon -->
        <nav-item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </el-menu-item>
    </template>

    <!-- 顶部菜单超出数量折叠 -->
    <el-submenu index="more" v-if="topMenus.length > visibleNumber">
      <template slot="title">
        更多菜单
      </template>
      <template v-for="(item, index) in topMenus">
        <el-menu-item
          :index="item.path"
          :key="index"
          v-if="index >= visibleNumber"
        >
          <!-- 兼容svg图片和el-icon -->
          <nav-item
            v-if="item.meta"
            :icon="item.meta && item.meta.icon"
            :title="item.meta.title"
          />
        </el-menu-item>
      </template>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import NavItem from "./NavItem";

export default {
  components: { NavItem },
  data() {
    return {
      // 顶部栏初始数
      visibleNumber: 5,
      // 是否为首次加载
      isFrist: false,
      // 当前激活菜单的 index
      currentIndex: undefined
    };
  },
  computed: {
    ...mapGetters(["routes", "sidebarRoutes"]),
    theme() {
      console.log(this.$store.state.settings.theme);
      return this.$store.state.settings.theme;
    },
    // 顶部显示菜单
    topMenus() {
      let topMenus = [];
      this.routers.map(menu => {
        // 排除掉hidden=true的和默认路由 path='/' 的
        if (menu.hidden !== true && menu.path !== "/") {
          topMenus.push(menu);
        }
      });
      return topMenus;
    },
    // 所有的路由信息
    routers() {
      return this.$store.state.permission.routes;
    },
    // 遍历所有的子路由，子路由的路径加上父路径
    childrenMenus() {
      var childrenMenus = [];
      this.routers.map(router => {
        for (var item in router.children) {
          if (router.children[item].parentPath === undefined) {
            if (router.path !== "/") {
              if (!this.ishttp(router.children[item].path)) {
                router.children[item].path =
                  router.path + "/" + router.children[item].path;
              }
            }
            router.children[item].parentPath = router.path;
          }
          childrenMenus.push(router.children[item]);
        }
      });
      return childrenMenus;
    },
    // 默认激活的菜单
    activeMenu() {
      const path = this.$route.path;
      let activePath = this.routers[0].path;
      if (path.lastIndexOf("/") > 0) {
        const tmpPath = path.substring(1, path.length);
        activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
      }
      var routes = this.activeRoutes(activePath);
      if (routes.length === 0) {
        activePath = this.currentIndex || this.routers[0].path;
        this.activeRoutes(activePath);
      }
      return activePath;
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.setVisibleNumber);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setVisibleNumber);
  },
  mounted() {
    this.setVisibleNumber();
  },
  methods: {
    // 根据宽度计算设置显示栏数
    setVisibleNumber() {
      const width = document.body.getBoundingClientRect().width / 2;
      this.visibleNumber = parseInt(width / 80);
    },
    // 菜单选择事件
    handleSelect(key, keyPath) {
      this.currentIndex = key;
      if (this.ishttp(key)) {
        // http(s):// 路径新窗口打开
        window.open(key, "_blank");
      } else if (key.indexOf("/redirect") !== -1) {
        // /redirect 路径内部打开
        this.$router.push({ path: key.replace("/redirect", "") });
      } else {
        // 显示左侧联动菜单
        this.activeRoutes(key);
      }
    },
    // 当前激活的路由
    activeRoutes(key) {
      var routes = [];
      if (this.childrenMenus && this.childrenMenus.length > 0) {
        this.childrenMenus.map(item => {
          if (key == item.parentPath) {
            routes.push(item);
          }
        });
      }
      if (routes.length > 0) {
        this.$store.dispatch("permission/changeSidebarRoutes", routes);
      }
      return routes;
    },
    ishttp(url) {
      return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
    }
  }
};
</script>

<style lang="scss">
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 50px;
  line-height: 50px;
  margin: 0;
  border-bottom: 2px solid transparent;
  padding: 0 5px;
  margin: 0 10px;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #{"var(--theme)"};
}

/* submenu item */
.el-menu--horizontal > .el-submenu .el-submenu__title {
  padding: 0 5px;
  height: 50px !important;
  line-height: 52px !important;
  margin: 0 10px;
}
</style>
