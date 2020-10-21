import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Notification } from 'element-ui'
import { getPageTitle } from './utils'

// 页面顶部的加载进度条
NProgress.configure({ showSpinner: false })

// 配置路由权限白名单
const whiteList = ['/login', '/regist']

// 路由守卫：路由跳转前
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/home' })
      NProgress.done()
    } else {
      const hasAccess = store.getters.access && store.getters.access.length > 0
      if (hasAccess) {
        next()
      } else {
        try {
          // 获取用户权限
          const access = await store.dispatch('user/info')
          await store.dispatch('dir/getDir')
          // 根据用户权限生成路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', access)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (err) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
        } finally {
          NProgress.done()
        }
      }
      next()
    }
  } else {
    const str = to.path.split('/')
    if (whiteList.indexOf('/' + str[1]) !== -1) {
      next()
    } else {
      Notification.info({
        title: '提示',
        message: '请先登录账户'
      })
      next('/login')
      NProgress.done()
    }
  }
})

// 路由首页：路由跳转后
router.afterEach(() => NProgress.done())
