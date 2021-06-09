import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true
  },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  // 没有首页，默认跳转到指定页面
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/table/index',
  // },

  // 示例页面
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    meta: {
      title: '表格',
      icon: 'el-icon-s-grid'
    },
    alwaysShow: true,
    children: [{
      path: 'index',
      component: () => import('@/views/table/index'),
      meta: {
        title: '示例',
      }
    }]
  },

  // 跳转外部链接
  {
    path: '跳转外部链接',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com',
        meta: { title: '跳转外部链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', //使用history模式，需要设置base
  // base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  // 防止退出后再登录，查询的权限菜单会有重复的路由
  router.options.routes = constantRoutes
}

export default router
