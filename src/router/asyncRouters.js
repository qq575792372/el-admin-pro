import Layout from "@/layout";

/**
 * 异步路由列表，模拟后台加载菜单后生成的路由数据
 */
export const asyncRouters = [
  {
    path: "/member",
    component: Layout,
    meta: {
      title: "会员"
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/table/index"),
        meta: {
          title: "菜单1"
        },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/table/index"),
            meta: {
              title: "菜单1-1"
            },
            hidden: true
          },
          {
            path: "menu1-2",
            component: () => import("@/views/table/index"),
            meta: {
              title: "菜单1-2"
            },
            hidden: true
          }
        ]
      },
      {
        path: "menu2",
        component: () => import("@/views/table/index"),
        meta: {
          title: "菜单2"
        }
      }
    ]
  }
];
