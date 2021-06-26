<!-- 布局设置组件 -->
<template>
  <el-drawer
    ref="rightPanel"
    :visible.sync="showDrawer"
    direction="rtl"
    title="布局设置"
    size="260px"
  >
    <slot />
  </el-drawer>
</template>

<script>
export default {
  name: "RightPanel",
  computed: {
    showDrawer: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val
        });
      }
    }
  }
};
</script>
