<template>
  <div class="login-container">
    <!-- 登录背景 -->
    <div class="login-bg" :style="{ filter: `blur(${loginBgBlur})` }"></div>
    <!-- 登录窗口 -->
    <div class="login-main">
      <!-- 标题 -->
      <div class="login-title">
        后台管理登录
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="输入用户名"
            type="text"
            tabindex="1"
            size="default"
            auto-complete="on"
          >
            <i slot="prefix" class="el-icon-user-solid"></i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="输入密码"
            size="default"
            tabindex="2"
          >
            <svg-icon slot="prefix" icon-class="password" />
            <!-- 切换密码图标 -->
            <svg-icon
              slot="suffix"
              @click.native="showPwd"
              style=" cursor: pointer; color:#606266;user-select:none;"
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="validcode">
          <div class="valid-box">
            <div class="valid-input">
              <el-input
                ref="validcode"
                v-model="loginForm.validcode"
                placeholder="输入验证码"
                type="text"
                size="default"
                tabindex="3"
              >
                <svg-icon slot="prefix" icon-class="validCode" />
              </el-input>
            </div>
            <img class="valid-img" :src="validImageUrl" @click="handleChangeValidImageUrl" />
          </div>
        </el-form-item>
        <!-- 登录 -->
        <el-button
          :loading="loginLoading"
          type="primary"
          tabindex="4"
          size="default"
          style="width:100%; margin-bottom:15px; margin-top:10px; border-radius:6px;"
          @click.native.prevent="handleLogin"
        >
          {{ loginLoading ? "登录中.." : "登录" }}
        </el-button>
      </el-form>
      <!-- 去注册和忘记密码 -->
      <div class="login-operate">
        <el-link size="small" :underline="false" type="primary">去注册</el-link>
        <el-link size="small" :underline="false" type="primary">忘记密码?</el-link>
      </div>
      <!-- 底部提示 -->
      <div class="login-tips">
        <span style="float: right;">账号，密码，验证码随意输入</span>
      </div>
    </div>
    <!-- 登录底部 -->
    <div class="login-footer">
      Copyright © 2021 vue-element-admin All Rights Reserved.
    </div>
  </div>
</template>

<script>
import { loginBgBlur } from "@/settings";
export default {
  name: "Login",
  data() {
    return {
      // 背景图片高斯模糊像素，通过settings配置中获取
      loginBgBlur,

      // 登录表单
      loginForm: {
        username: "",
        password: "",
        validcode: ""
      },
      // 登录表单验证规则
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入用户名"));
              } else {
                callback();
              }
            }
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入密码"));
              } else {
                callback();
              }
            }
          }
        ],
        validcode: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入验证码"));
              } else {
                callback();
              }
            }
          }
        ]
      },

      // 验证码图片地址
      validImageUrl: (this.validImageUrl =
        "http://119.23.220.221:8090/hltrip_web/kaptcha/adminKaptcha?t=" + new Date().getTime()),

      // 登录loading
      loginLoading: false,

      // 切换显示隐藏密码
      passwordType: "password",

      // 跳转登录来源
      redirect: null
    };
  },
  watch: {
    // 监听首页路由地址来源，登录后跳转到该地址
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    window.addEventListener("keydown", this.onKeyDown);
  },
  methods: {
    /**
     * 点击回车登录
     */
    onKeyDown(e) {
      if (e.keyCode == 13) {
        this.handleLogin();
      }
    },
    /**
     * 切换密码显示
     */
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    /**
     * 点击登录
     */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginLoading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(res => {
              setTimeout(() => {
                this.loginLoading = false;
              }, 300);
              if (res.code == "0000") {
                this.$router.push({ path: this.redirect || "/" });
              } else {
                this.$message({
                  message: res.message,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.loginLoading = false;
            });
        } else {
          this.loginLoading = false;
          return false;
        }
      });
    },
    /**
     * 点击更改验证码图片
     */
    handleChangeValidImageUrl() {
      this.validImageUrl = "http://119.23.220.221:8090/hltrip_web/kaptcha/adminKaptcha?t=" + new Date().getTime();
    }
  },
  destroyed() {
    // 离开页面，清空回车事件
    window.removeEventListener("keydown", this.onKeyDown, false);
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;

  // 背景图片，加入高斯模糊
  .login-bg {
    position: absolute;
    background: url("../../assets/login/login_bg_1.jpg") no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    transform: scale(1.06); // 放大图片，可以解决模糊后四周有白边的问题
    // filter: blur(10px);
  }

  // 登录主窗口
  .login-main {
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 460px;
    height: 420px;
    z-index: 1000;
    margin: auto;
    margin-top: 10%;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    // 登录标题
    .login-title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      color: #303133;
      height: 64px;
      line-height: 64px;
      border-bottom: solid 1px #e8eaec;
    }

    // 登录表单
    .login-form {
      padding: 25px 20px 0px 20px;
      .el-form-item {
        margin-bottom: 26px;
      }
      // 验证码样式
      .valid-box {
        display: flex;
        .valid-input {
          flex: 1;
          margin-right: 10px;
        }
        .valid-img {
          width: 140px;
          height: 40px;
          cursor: pointer;
        }
      }
    }

    // 去注册和忘记密码
    .login-operate {
      display: flex;
      justify-content: space-between;
      padding: 0px 20px;
    }

    // 登录小提示
    .login-tips {
      font-size: 12px;
      color: #909399;
      padding: 20px;
    }
  }

  // 底部工商备案信息
  .login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
    z-index: 10;
  }
}
</style>
<style lang="scss">
.login-form {
  .el-input .el-input__prefix {
    left: 10px;
    color: #808695;
  }
}
</style>
