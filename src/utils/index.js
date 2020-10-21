const { SYSTEM_NAME } = require('../constant')
const title = SYSTEM_NAME
// 防抖
export function _debounce (fn, delay) {
  // eslint-disable-next-line no-redeclare
  var delay = delay || 200
  var timer
  return function () {
    var th = this
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(th, args)
    }, delay)
  }
}
// 节流
export function _throttle (fn, interval) {
  var last
  var timer
  // eslint-disable-next-line no-redeclare
  var interval = interval || 200
  return function () {
    var th = this
    var args = arguments
    var now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(th, args)
      }, interval)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}

/**
 * @description: 使用 promise 封装 element 表单验证方法
 * @param {vueInstance} that
 * @param {string} refName
 * @return: Promise
 */
export function formValidate (that, refName) {
  return new Promise((resolve, reject) => {
    that.$refs[refName].validate((valid) => {
      if (valid) {
        resolve()
      } else {
        reject(Error('表单验证失败'))
      }
    })
  })
}

export function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  // eslint-disable-next-line no-unused-vars
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
}
