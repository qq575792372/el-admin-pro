import Vue from "vue";
import Router from "vue-router";

// 防止点击同一个路由时候报错
//获取原型对象上的push函数
const originalPush = Router.prototype.push;
//修改原型对象中的push方法
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

  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/401",
    component: () => import("@/views/401"),
    hidden: true
  },

  // 首页
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/index"),
        meta: { title: "首页", affix: true, icon: "el-icon-s-home" }
      }
    ]
  },

  // 没有首页，默认跳转到指定页面
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/table/index',
  // },

  // 系统管理
  {
    path: "/system",
    component: Layout,
    redirect: "/system/userManage",
    meta: {
      title: "系统管理",
      icon: "el-icon-s-tools"
    },
    alwaysShow: true,
    children: [
      {
        path: "userManage",
        name: "userManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "用户管理",
          icon: "el-icon-user-solid"
        }
      },
      {
        path: "roleManage",
        name: "roleManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "角色管理"
        }
      },
      {
        path: "menuManage",
        name: "menuManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "菜单管理"
        }
      },
      {
        path: "departManage",
        name: "departManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "部门管理"
        }
      },
      {
        path: "dictManage",
        name: "dictManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "字典管理"
        }
      },
      {
        path: "dataManage",
        name: "dataManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "数据管理"
        }
      }
    ]
  },

  // 平台管理
  {
    path: "/platform",
    component: Layout,
    redirect: "/platform/onlineUser",
    meta: {
      title: "平台管理",
      icon: "el-icon-s-platform"
    },
    alwaysShow: true,
    children: [
      {
        path: "onlineUser",
        name: "onlineUser",
        component: () => import("@/views/table/index"),
        meta: {
          title: "在线用户"
        }
      },
      {
        path: "operateLog",
        name: "operateLog",
        component: () => import("@/views/table/index"),
        meta: {
          title: "操作日志"
        }
      },
      {
        path: "errorLog",
        name: "errorLog",
        component: () => import("@/views/table/index"),
        meta: {
          title: "异常日志"
        }
      },
      {
        path: "serveListen",
        name: "serveListen",
        component: () => import("@/views/table/index"),
        meta: {
          title: "服务监听"
        }
      }
    ]
  },

  // 多级菜单
  {
    path: "/tree",
    component: Layout,
    redirect: "/tree/one",
    meta: {
      title: "多级菜单",
      icon: "tree"
    },
    children: [
      {
        path: "one",
        component: () => import("@/views/table/index"),
        meta: {
          title: "二级菜单1"
        },

        children: [
          {
            path: "one-1",
            name: "one-1",
            component: () => import("@/views/table/index"),
            meta: {
              title: "二级菜单1-1"
            }
          },
          {
            path: "one-2",
            name: "one-2",
            component: () => import("@/views/table/index"),
            meta: {
              title: "二级菜单1-2"
            }
          }
        ]
      },
      {
        path: "two",
        name: "two",
        component: () => import("@/views/table/index"),
        meta: {
          title: "二级菜单2"
        }
      }
    ]
  },

  // 跳转外部链接
  {
    path: "跳转外部链接",
    component: Layout,
    children: [
      {
        path: "https://www.baidu.com",
        meta: { title: "跳转到百度", icon: "link" }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
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
