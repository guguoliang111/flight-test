import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission (access, route) {
  if (route.meta && route.meta.access) {
    return access.some(item => route.meta.access.includes(item))
  } else {
    return true
  }
}

export function filterAsyncRoutes (routes, access) {
  const res = []
  routes.forEach(route => {
    if (hasPermission(access, route)) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, access)
      }
      res.push(route)
    }
  })
  return res
}

const state = {
  addRoutes: [],
  routes: []
}

const mutations = {
  setRoutes: (state, routes) => {
    state.addRoutes = routes
    state.routes = [...constantRoutes, ...routes]
  },
  CLEAR_ROUTES: (state) => {
    state.routes = []
  }
}

const actions = {
  generateRoutes ({ commit }, access) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, access)
      commit('setRoutes', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
