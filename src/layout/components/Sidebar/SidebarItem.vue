<template>
  <div v-if="!item.hidden && item.meta">
    <!-- children包含一个元素 -->
    <template
      v-if="hasOneShowingChild(item.children, item) && !item.alwaysShow"
    >
      <app-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
        :target="onlyOneChild.meta.target"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>
    <!-- children包含多个元素 -->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    // 这里要写在外层，为了避免在一些极端情况下循环渲染出现报错
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      if (!children) {
        children = [];
      }
      // 获取children中非hidden的集合
      const showingChildren = children.filter(item => !item.hidden);

      // 如果集合且只有一个元素则赋值给onlyOneChild
      if (showingChildren.length === 1) {
        this.onlyOneChild = showingChildren[0];
        return true;
      }
      // 如果集合没有元素，则onlyOneChild为父级
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent };
        return true;
      }
      return false;
    },
    /**
     * 转换路径，会拼加basePath + 当前路径
     */
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      // 修复多级菜单下，如果包含子级的菜单多重复拼加当前routePath的问题
      let basePath = this.basePath.replace(routePath, "");
      return path.resolve(basePath, routePath);
    }
  }
};
</script>
