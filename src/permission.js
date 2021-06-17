import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // 获取登录的token
  const hasToken = getToken();
  // 有token
  if (hasToken) {
    if (to.path === "/login") {
      // 如果已经登录，地址栏输入login，则默认跳转到首页
      next({ path: "/" });
      NProgress.done();
    } else {
      // 拉去并添加过动态路由，不再添加
      if (store.getters.addRoutes.length > 0) {
        next();
      } else {
        // 权限路由
        const accessRoutes = await store.dispatch("permission/generateRoutes");
        console.log(3333, accessRoutes);
        router.addRoutes(accessRoutes);
        // next page
        next({ ...to, replace: true });
      }
    }
  } else {
    // 没有token
    // 在白名单中的路由地址正常跳转
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // 不在白名单，并且没有登录的token则跳转到login，并且地址带入redirect来源
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
