import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const RouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err)
}
const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'welcome', component: () => import('@/views/welcome') },
      { path: '/flightTestpm', name: 'flightTestpm', meta: { title: '试飞参数管理' }, component: () => import('@/views/flight-test-pm') } // 试飞数据管理

    ]
  }
]

const router = new Router({
  mode: 'history',
  routes
})
export default router
