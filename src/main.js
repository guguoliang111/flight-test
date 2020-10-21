import Vue from 'vue'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import './styles/element-variables.scss'
import './styles/index.scss'
import 'font-awesome/css/font-awesome.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import hasAccess from '@/directive/hasAccess'
import isAccess from '@/utils/hasAccess'
import * as filters from './filters'
import { formValidate } from '@/utils'
import echarts from 'echarts'
import vueSeamlessScroll from 'vue-seamless-scroll'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

Vue.prototype.$echarts = echarts
Vue.prototype.$imgServer = process.env.VUE_APP_IMG_SERVER
Vue.prototype.$geoServer = process.env.VUE_APP_GEO_SERVER
Vue.prototype.$fileServer = process.env.VUE_APP_FILE_SERVER + process.env.VUE_APP_IMG_SERVER
Vue.prototype.$formValidate = formValidate
Vue.prototype.$hasAccess = isAccess
Vue.prototype.$log = window.console.log

Vue.use(vueSeamlessScroll)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(Element, {
  size: 'medium'
})
// 注册全局指令
Vue.use(hasAccess)

// 注册全局组件
const globalComponents = require.context('./components/global', true, /\.vue$/)
globalComponents.keys().forEach(item => {
  const component = globalComponents(item).default
  Vue.component(component.name, component)
})

// 注册全局过滤器
Object.keys(filters).forEach(key => Vue.filters(key, filters[key]))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
