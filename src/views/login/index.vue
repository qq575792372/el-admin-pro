<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">后台管理</h3>
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="validcode">
        <div class="validcode">
          <div class="item-left">
            <span class="svg-container">
              <svg-icon icon-class="guide" />
            </span>
            <el-input
              ref="validcode"
              v-model="loginForm.validcode"
              placeholder="输入验证码"
              name="validcode"
              type="text"
              tabindex="1"
            ></el-input>
          </div>
          <img class="item-right" :src="validImageUrl" @click="handleChangeValidImageUrl" />
        </div>
      </el-form-item>
      <!-- 登录 -->
      <el-button
        :loading="loginLoading"
        type="primary"
        style="width:100%; margin-bottom:20px; margin-top:20px; border-radius:6px;"
        @click.native.prevent="handleLogin"
      >{{loginLoading ? '登录中..' : '登录'}}</el-button>
      <!-- 底部提示 -->
      <div class="tips">
        <span style="float: right;">-壹诺科技-</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    return {
      // 登录表单
      loginForm: {
        username: '',
        password: '',
        validcode: '',
      },
      // 登录表单验证规则
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入用户名'))
            } else {
              callback()
            }
          }
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入密码'))
            } else {
              callback()
            }
          }
        }],
        validcode: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入验证码'))
            } else {
              callback()
            }
          }
        }],
      },

      // 验证码图片地址
      validImageUrl: '',
      // 登录loading
      loginLoading: false,
      passwordType: 'password',
      redirect: null
    }
  },
  watch: {
    // 监听首页路由地址来源，登录后跳转到该地址
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // 初始化验证码图片地址
    this.validImageUrl = process.env.VUE_APP_BASE_API + '/hltrip_shop/kaptcha/adminKaptcha?t=' + new Date().getTime();
  },
  mounted() {
    window.addEventListener("keydown", this.onKeyDown);
  },
  methods: {
    /**
     * 切换密码显示
     */
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    /**
     * 回车登录
     */
    onKeyDown(e) {
      if (e.keyCode == 13) {
        this.handleLogin();
      }
    },
    /**
     * 点击登录
     */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginLoading = true;
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            setTimeout(() => {
              this.loginLoading = false;
            }, 300);
            if (res.code == '0000') {
              this.$router.push({ path: this.redirect || '/' })
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          }).catch(() => {
            this.loginLoading = false;
          })
        } else {
          this.loginLoading = false;
          return false
        }
      })
    },
    /**
     * 点击更改验证码图片
     */
    handleChangeValidImageUrl() {
      this.validImageUrl = process.env.VUE_APP_BASE_API + '/hltrip_web/kaptcha/adminKaptcha?t=' + new Date().getTime();
    }
  },
  destroyed() {
    // 离开页面，清空回车事件
    window.removeEventListener("keydown", this.onKeyDown, false);
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    // 验证码
    .validcode {
      display: flex;
      .item-left {
        flex: 1;
      }
      .item-right {
        height: 52px;
        width: 160px;
        cursor: pointer;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
