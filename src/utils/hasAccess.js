import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function hasAccess (value) {
  if (value && value instanceof Array && value.length > 0) {
    const access = store.getters && store.getters.perlist
    const hasAccess = access.some(role => {
      return value.includes(role)
    })

    if (!hasAccess) {
      return false
    }
    return true
  } else {
    console.error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    return false
  }
}
