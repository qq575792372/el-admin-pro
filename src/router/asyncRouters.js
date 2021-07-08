import Layout from "@/layout";
import ParentView from "@/components/ParentView";

/**
 * 异步路由列表，模拟后台加载菜单后生成的路由数据
 */
export const asyncRouters = [
  // 会员
  {
    path: "/member",
    component: Layout,
    redirect: "/member/memberManage",
    meta: {
      title: "会员",
      icon: "el-icon-user-solid"
    },
    alwaysShow: true,
    children: [
      {
        path: "memberManage",
        name: "memberManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "会员管理"
        }
      },
      {
        path: "memberLevel",
        name: "memberLevel",
        component: () => import("@/views/table/index"),
        meta: {
          title: "会员级别"
        }
      },
      {
        path: "memberRecharge",
        name: "memberRecharge",
        component: () => import("@/views/table/index"),
        meta: {
          title: "会员充值"
        }
      },
      {
        path: "memberCash",
        name: "memberCash",
        component: () => import("@/views/table/index"),
        meta: {
          title: "会员提现"
        }
      }
    ]
  },

  // 商品
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/goodsManage",
    meta: {
      title: "商品",
      icon: "el-icon-s-goods"
    },
    alwaysShow: true,
    children: [
      {
        path: "goodsManage",
        name: "goodsManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "商品管理"
        }
      },
      {
        path: "goodsType",
        name: "goodsType",
        component: () => import("@/views/table/index"),
        meta: {
          title: "商品分类"
        }
      },
      {
        path: "goodsBrand",
        name: "goodsBrand",
        component: () => import("@/views/table/index"),
        meta: {
          title: "商品品牌"
        }
      }
    ]
  },

  // 促销
  {
    path: "/promotion",
    component: Layout,
    redirect: "/promotion/seckillActivity",
    meta: {
      title: "促销",
      icon: "el-icon-s-ticket"
    },
    alwaysShow: true,
    children: [
      {
        path: "seckillActivity",
        name: "seckillActivity",
        component: () => import("@/views/table/index"),
        meta: {
          title: "秒杀活动"
        }
      },
      {
        path: "groupActivity",
        name: "groupActivity",
        component: () => import("@/views/table/index"),
        meta: {
          title: "拼团活动"
        }
      },
      {
        path: "couponManage",
        name: "couponManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "优惠券"
        }
      }
    ]
  },

  // 库存
  {
    path: "/stock",
    component: Layout,
    redirect: "/stock/stockList",
    meta: {
      title: "库存",
      icon: "redis"
    },
    alwaysShow: true,
    children: [
      {
        path: "stockList",
        name: "stockList",
        component: () => import("@/views/table/index"),
        meta: {
          title: "库存列表"
        }
      },
      {
        path: "stockCheck",
        name: "stockCheck",
        component: () => import("@/views/table/index"),
        meta: {
          title: "库存盘点"
        }
      }
    ]
  },

  // 订单
  {
    path: "/order",
    component: Layout,
    redirect: "/order/orderList",
    meta: {
      title: "订单",
      icon: "el-icon-s-order"
    },
    alwaysShow: true,
    children: [
      {
        path: "orderList",
        name: "orderList",
        component: () => import("@/views/table/index"),
        meta: {
          title: "订单管理"
        }
      }
    ]
  },

  // 平台
  {
    path: "/platform",
    component: Layout,
    redirect: "/platform/noticeManage",
    meta: {
      title: "平台",
      icon: "el-icon-s-platform"
    },
    alwaysShow: true,
    children: [
      {
        path: "noticeManage",
        name: "noticeManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "通知公告"
        }
      },
      {
        path: "adManage",
        name: "adManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "广告管理"
        }
      },
      {
        path: "friendLink",
        name: "friendLink",
        component: () => import("@/views/table/index"),
        meta: {
          title: "友情链接"
        }
      }
    ]
  },

  // 统计
  {
    path: "/statis",
    component: Layout,
    redirect: "/statis/userManage",
    meta: {
      title: "统计",
      icon: "el-icon-s-data"
    },
    alwaysShow: true,
    children: [
      {
        path: "saleStatis",
        name: "saleStatis",
        meta: {
          title: "销售统计"
        },
        component: ParentView,
        // 多级菜单，需要设置parent的组件为ParentView才可以
        children: [
          {
            path: "saleNum",
            name: "saleNum",
            component: () => import("@/views/table/index"),
            meta: {
              title: "销售量统计"
            }
          },
          {
            path: "saleAmount",
            name: "saleAmount",
            component: () => import("@/views/table/index"),
            meta: {
              title: "销售额统计"
            }
          },
          {
            path: "returnNum",
            name: "returnNum",
            component: () => import("@/views/table/index"),
            meta: {
              title: "退货量统计"
            }
          },
          {
            path: "returnAmount",
            name: "returnAmount",
            component: () => import("@/views/table/index"),
            meta: {
              title: "退货额统计"
            }
          },
          {
            path: "orderStatis",
            name: "orderStatis",
            component: () => import("@/views/table/index"),
            meta: {
              title: "订单统计"
            }
          }
        ]
      },
      {
        path: "memberAmountStatis",
        name: "memberAmountStatis",
        component: () => import("@/views/table/index"),
        meta: {
          title: "会员消费统计"
        }
      },
      {
        path: "memberRegisterStatis",
        name: "memberRegisterStatis",
        component: () => import("@/views/table/index"),
        meta: {
          title: "会员注册统计"
        }
      },
      {
        path: "financeStatis",
        name: "financeStatis",
        component: () => import("@/views/table/index"),
        meta: {
          title: "财务统计"
        }
      }
    ]
  },

  // 系统
  {
    path: "/system",
    component: Layout,
    redirect: "/system/userManage",
    meta: {
      title: "系统",
      icon: "el-icon-s-tools"
    },
    alwaysShow: true,
    children: [
      {
        path: "userManage",
        name: "userManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "用户管理"
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
        path: "dictManage",
        name: "dictManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "字典管理"
        }
      },
      {
        path: "payTypeManage",
        name: "payTypeManage",
        component: () => import("@/views/table/index"),
        meta: {
          title: "支付方式"
        }
      },
      {
        path: "operateLog",
        name: "operateLog",
        component: () => import("@/views/table/index"),
        meta: {
          title: "操作日志"
        }
      }
    ]
  },

  // 跳转外部链接
  {
    path: "https://cn.bing.com",
    name: "linkBiying",
    meta: { title: "当前窗口打开", icon: "el-icon-share" }
  },
  {
    path: "https://www.baidu.com",
    name: "linkBaidu",
    meta: { title: "打开新窗口", icon: "el-icon-share", target: "_blank" }
  }
];
