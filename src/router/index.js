import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/layout/admin'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login&regist')
  },
  {
    path: '/regist',
    name: 'Regist',
    component: () => import('@/views/login&regist')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    component: Admin,
    path: '/home',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '首页' },
        component: () => import('@/views/home')
      },
      {
        path: '/dataSearch',
        name: 'DataSearch',
        meta: {
          title: '数据浏览'
        },
        component: () => import('@/views/data-search')
      },
      {
        path: '/dataManage',
        name: 'DataManage',
        meta: { title: '数据管理' },
        component: () => import('@/views/data-manage')
      },
      {
        path: '/resourceDir',
        name: 'ResourceDir',
        meta: {
          title: '目录管理'
        },
        component: () => import('@/views/resource-dir')
      },
      {
        path: '/orderManagement',
        name: 'OrderManagement',
        meta: {
          title: '订单管理'
        },
        redirect: '/OrderManagement/shoppingYrolley',
        component: () => import('@/views/order-management'),
        children: [{
          path: 'shoppingYrolley',
          name: 'ShoppingYrolley',
          meta: {
            title: '购物车'
          },
          component: () => import('@/views/order-management/shopping-trolley')
        },
        {
          path: 'applicationRecord',
          name: 'ApplicationRecord',
          meta: {
            title: '申请记录'
          },
          component: () => import('@/views/order-management/application-record')
        },
        {
          path: 'orderHistory',
          name: 'OrderHistory',
          meta: {
            title: '历史订单'
          },
          component: () => import('@/views/order-management/order-history')
        },
        {
          path: 'orderReview',
          name: 'OrderReview',
          meta: {
            title: '订单审核'
          },
          component: () => import('@/views/order-management/order-review')
        }
        ]
      },
      {
        path: '/userManage',
        name: 'UserManage',
        meta: {
          title: '系统管理'
        },
        redirect: '/userManage/userManagement',
        component: () => import('@/views/user-manage'),
        children: [{
          path: 'userManagement',
          name: 'userManagement',
          meta: {
            title: '用户管理'
          },
          component: () => import('@/views/user-manage/user-management')
        },
        {
          path: 'logManagement',
          name: 'LogManagement',
          meta: {
            title: '日志管理'
          },
          component: () => import('@/views/user-manage/log-management')
        },
        {
          path: 'systemMonitoring',
          name: 'SystemMonitoring',
          meta: {
            title: '系统监控'
          },
          component: () => import('@/views/user-manage/system-monitoring')
        }
        ]
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        meta: { title: '用户中心' },
        component: () => import('@/views/user-center')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
