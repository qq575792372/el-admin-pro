<template>
  <div class="scroll-container">
    <el-button
      class="scroll-prev"
      icon="el-icon-arrow-left"
      @click="handleLeftScroll(-240)"
    ></el-button>
    <el-scrollbar
      ref="scrollContainer"
      :vertical="false"
      class="scroll-inner"
      @wheel.native.prevent="handleScroll"
    >
      <slot />
    </el-scrollbar>
    <el-button
      class="scroll-next"
      icon="el-icon-arrow-right"
      @click="handleLeftScroll(240)"
    ></el-button>
  </div>
</template>

<script>
const tagAndTagSpacing = 4; // tagAndTagSpacing

export default {
  name: "ScrollPane",
  data() {
    return {
      left: 0
    };
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap;
    }
  },
  mounted() {
    this.scrollWrapper.addEventListener("scroll", this.emitScroll, true);
  },
  beforeDestroy() {
    this.scrollWrapper.removeEventListener("scroll", this.emitScroll);
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      console.log("eventDelta", eventDelta);
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
      console.log("$scrollWrapper.scrollLeft", $scrollWrapper.scrollLeft);
    },
    emitScroll() {
      this.$emit("scroll");
    },
    handleLeftScroll(offset) {
      const eventDelta = offset;
      console.log("eventDelta", eventDelta);
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
      console.log("$scrollWrapper.scrollLeft", $scrollWrapper.scrollLeft);
    },
    moveToTarget(currentTag) {
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollWrapper;
      const tagList = this.$parent.$refs.tag;

      let firstTag = null;
      let lastTag = null;

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft =
          $scrollWrapper.scrollWidth - $containerWidth;
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing;

        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-container {
  display: flex;
  .scroll-prev,
  .scroll-next {
    padding: 6px;
    height: 34px;
    font-size: 12px;
    border-radius: 0px;
    text-align: center;
  }
  .scroll-inner {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    flex: 1;
    ::v-deep {
      .el-scrollbar__bar {
        bottom: 0px;
      }
      .el-scrollbar__wrap {
        height: 49px;
      }
    }
  }
}
</style>
