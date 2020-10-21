import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/layout/admin'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
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
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: Admin,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '首页' },
        component: () => import('@/views/home')
      },
      {
        path: '/detail',
        name: 'Detail',
        meta: {
          title: '详情'
        },
        component: () => import('@/views/home/components/detail')
      },
      {
        path: '/dataSearch',
        name: 'DataSearch',
        meta: { title: '数据查询' },
        component: () => import('@/views/data-search')
      },
      {
        path: '/dataManage',
        name: 'DataManage',
        meta: { title: '数据管理' },
        component: () => import('@/views/data-manage'),
        redirect: '/dataManage/list',
        children: [
          {
            path: 'list',
            name: 'DataList',
            meta: {
              title: '数据列表'
            },
            component: () => import('@/views/data-manage/list')
          },
          {
            path: 'landManage',
            name: 'LandManage',
            meta: {
              title: '地块管理'
            },
            component: () => import('@/views/data-manage/land-manage')
          },
          {
            path: 'operationRecord',
            name: 'LandOperationRecord',
            meta: {
              title: '田间操作记录'
            },
            component: () => import('@/views/data-manage/operation-record')
          },
          {
            path: 'xlsxView/:id/:type',
            name: 'XlsxView',
            meta: {
              title: '数据查看'
            },
            component: () => import('@/views/data-manage/xlsx-view')
          }
        ]
      },
      {
        path: '/resourceDir',
        name: 'ResourceDir',
        meta: { title: '资源目录' },
        component: () => import('@/views/resource-dir')
      },
      {
        path: '/userManage',
        name: 'UserManage',
        meta: { title: '用户管理' },
        component: () => import('@/views/user-manage')
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        meta: { title: '用户中心' },
        component: () => import('@/views/user-center')
      },
      {
        path: '/dataManage/view/:id/:flag',
        name: 'DataView',
        meta: { title: '数据查看' },
        component: () => import('@/views/data-manage/view')
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
