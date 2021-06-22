import Vue from "vue";
import Router from "vue-router";

// 防止点击同一个路由时候报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // tags-view刷新页面中间件
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: resolve => require(["@/views/redirect"], resolve)
      }
    ]
  },

  // 登录
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  // 错误页面
  {
    path: "/403",
    component: () => import("@/views/403"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/500",
    component: () => import("@/views/500"),
    hidden: true
  },

  // 默认路由跳转到首页
  {
    path: "/",
    redirect: "/dashboard/index",
    component: Layout
  },

  // 首页
  {
    path: "/dashboard",
    name: "dashboard",
    component: Layout,
    redirect: "/dashboard/index",
    meta: {
      title: "首页",
      icon: "el-icon-s-home"
    },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", affix: true }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // 如果有权限菜单，需要写在权限路由加载后的最后面，不然刷新页面会404
  // { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    mode: "history", // 使用history模式，需要设置base路径
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
  // 防止退出后再登录，再次加载权限菜单会有重复的路由
  router.options.routes = constantRoutes;
}

export default router;
