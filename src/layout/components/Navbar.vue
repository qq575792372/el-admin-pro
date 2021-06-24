<template>
  <div class="navbar">
    <!-- 切换左侧菜单缩小模式 -->
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- 面包屑导航 -->
    <breadcrumb class="breadcrumb-container" v-if="!topNav" />

    <!-- 顶部导航 -->
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav" />

    <!-- 右侧头像 -->
    <div class="right-menu">
      <span class="avatar-title">
        <span style="padding-left:3px; font-weight:bold;">{{ name }}</span>
      </span>

      <el-dropdown class="avatar-container" trigger="click" size="medium">
        <div class="avatar-wrapper">
          <img src="../../assets/avatar.png" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import TopNav from "@/layout/components/TopNav";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    TopNav
  },
  computed: {
    ...mapGetters(["sidebar", "name"]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val
        });
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$confirm("确定退出登录吗？", "提示", {
        type: "warning"
      })
        .then(async () => {
          // clcik ok
          await this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        })
        .catch(() => {
          // click no
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 48px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    .avatar-title {
      font-size: 14px;
      color: #303133;
      position: relative;
      top: -14px;
      right: 10px;
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s ease-in-out;

        &:hover {
          background: rgba(0, 0, 0, 0.035);
        }
      }
    }
    // 头像
    .avatar-container {
      margin-right: 20px;
      .avatar-wrapper {
        margin-top: 8px;
        position: relative;
        // 头像图片
        .user-avatar {
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: relative;
          bottom: 14px;
          left: 5px;
          font-size: 12px;
        }
      }
    }
  }
}
// 调整退出按钮的样式，稍微靠上一些
.el-popper {
  margin-top: 0px !important;
  top: 58px !important;
}
</style>
