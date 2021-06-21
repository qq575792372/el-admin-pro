<template>
  <div class="error-container">
    <img class="error-image" src="../assets/403_images/403.png" />
    <div class="error-content">
      <div><h1>403</h1></div>
      <div class="desc">抱歉，您无权访问该页面</div>
      <el-button type="primary" @click="backHome" icon="el-icon-s-home">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "403",
  data() {
    return {};
  },
  methods: {
    /**
     * 返回首页
     */
    backHome() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
.error-container {
  display: flex;
  justify-content: center;
  height: 100%;
  min-width: 960px;
  overflow: hidden;
  align-items: center;
  margin-top: -5%;
  .error-image {
    width: 430px;
    height: 430px;
    max-width: 100%;
  }
  .error-content {
    padding-left: 60px;
    h1 {
      color: #606266;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 16px;
    }
    .desc {
      color: #909399;
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 30px;
    }
  }
}
</style>
