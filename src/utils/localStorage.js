export function put (key, stringVal, time = 60) {
  if (!localStorage) return false
  const cacheExpireDate = (new Date() - 1) + time * 1000
  const cacheVal = {
    val: stringVal,
    exp: cacheExpireDate
  }
  localStorage.setItem(key, JSON.stringify(cacheVal))
}

export function get (key) {
  try {
    if (!localStorage) return false
    const cacheVal = localStorage.getItem(key)
    const result = JSON.parse(cacheVal)
    const now = new Date() - 1
    if (!result) return null
    if (now > result.exp) {
      remove(key)
      return ''
    }
    return result.val
  } catch (e) {
    remove(key)
    return null
  }
}

export function remove (key) {
  if (!localStorage) return false
  localStorage.removeItem(key)
}

export function clear () {
  if (!localStorage) return false
  localStorage.clear()
}
