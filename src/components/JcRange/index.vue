<!-- 验证码滑动组件 -->
<template>
  <div class="jc-range-container">
    <div class="jc-range" :class="rangeStatus ? 'success' : ''">
      <!-- 已经滑动过的背景 -->
      <div class="jc-slided-bg"></div>
      <i
        class="jc-arrow"
        @mousedown="rangeMove"
        :class="rangeStatus ? successIcon : startIcon"
      ></i>
      <!-- 显示的文案 -->
      <div class="jc-content content-animation">
        <span>{{ rangeStatus ? successText : startText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 组件名称，防止多个在一起时候重复
    elem: {
      type: String,
    },
    // 成功之后的函数
    successFun: {
      type: Function,
    },
    //成功图标
    successIcon: {
      type: String,
      default: "el-icon-success",
    },
    //成功文字
    successText: {
      type: String,
      default: "验证成功",
    },
    //开始的图标
    startIcon: {
      type: String,
      default: "el-icon-d-arrow-right",
    },
    //开始的文字
    startText: {
      type: String,
      default: "拖动滑块到最右边",
    },
    //失败之后的函数
    errorFun: {
      type: Function,
    },
    //或者用值来进行监听
    status: {
      type: String,
    },
  },
  name: "Silder",
  data() {
    return {
      rangeStatus: "",
    };
  },
  created() {},
  methods: {
    rangeMove(e) {
      let ele = e.target;
      let startX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth = ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      // 获得已滑过背景色元素对象
      let slidedElem = e.target.previousElementSibling;
      // 滑块content元素
      let contentElem = e.target.nextElementSibling;
      if (this.rangeStatus) {
        //不运行
        return false;
      }
      document.onmousemove = (e) => {
        let endX = e.clientX;
        this.disX = endX - startX;
        if (this.disX <= 0) {
          this.disX = 0;
        }
        if (this.disX >= MaxX - eleWidth) {
          //减去滑块的宽度,体验效果更好
          this.disX = MaxX;
        }
        ele.style.transition = "0s all";
        ele.style.transform = "translateX(" + this.disX + "px)";
        // 设置滑过的样式
        slidedElem.style.transition = "0s all";
        slidedElem.style.width = this.disX + "px";
        e.preventDefault();
      };
      document.onmouseup = () => {
        if (this.disX !== MaxX) {
          // 滑块的样式
          ele.style.transition = ".5s all";
          ele.style.transform = "translateX(0)";
          // 已滑过的样式控制
          slidedElem.style.transition = ".5s all";
          slidedElem.style.width = "0px";
          //执行成功的函数
          this.errorFun && this.errorFun();
        } else {
          this.rangeStatus = true;
          if (this.status) {
            this.$parent[this.status] = true;
          }
          // 拖动成功后，重置已滑过的背景颜色
          slidedElem.style.width = "0px";
          contentElem.classList.remove("content-animation");
          //执行成功的函数
          this.successFun && this.successFun();
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>
<style lang="scss" scoped>
// 动画
@keyframes slidetounlock {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}
// 滑块轨道样式
.jc-range {
  background: #e0e0e0;
  position: relative;
  transition: 0.8s all;
  user-select: none;
  font-size: 14px;
  color: #333;
  display: flex;
  justify-content: center;
  border: solid 1px #e0e0e0;
  align-items: center;
  height: 34px;
  // 已经滑过的背景
  .jc-slided-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0px;
    background: #52c41a;
    opacity: 0.6;
  }
  // 滑块中间显示的文案
  .jc-content {
    flex: 1;
    text-align: center;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    z-index: 1;
    // 动画
    &.content-animation {
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        color-stop(0, #4d4d4d),
        color-stop(0.4, #4d4d4d),
        color-stop(0.5, #fff),
        color-stop(0.6, #4d4d4d),
        color-stop(1, #4d4d4d)
      );
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-text-size-adjust: none;
      animation: slidetounlock 3s infinite;
    }
  }
  // 滑块元素的样式
  .jc-arrow {
    z-index: 2;
    cursor: move;
    position: absolute;
    left: 0;
    width: 42px;
    height: 100%;
    color: #666;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    // 滑动成功的小图标样式
    &.el-icon-success {
      font-size: 16px;
    }
  }
  // 滑动成功
  &.success {
    background-color: #52c41a;
    color: #fff;
  }
  // 滑动失败
  &.success .jc-arrow {
    color: #52c41a;
  }
}
</style>