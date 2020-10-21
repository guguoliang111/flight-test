/*
 * @Descripttion: coding...
 * @Version: 1.0.0版本
 * @Author: 张彤
 * @Date: 2020-07-10 17:23:34
 * @LastEditors: 张彤
 * @LastEditTime: 2020-07-10 18:02:32
 */
import store from '@/store'

export default (Vue) => {
  Vue.directive('hasAccess', {
    inserted (el, binding, vnode) {
      const { value } = binding
      const access = store.getters && store.getters.perlist
      if (value && value instanceof Array && value.length > 0) {
        const hasAccess = access.some(role => {
          return value.includes(role)
        })
        if (!hasAccess) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error('need access! Like v-hasAccess="[\'admin\']"')
      }
    }
  })
}
