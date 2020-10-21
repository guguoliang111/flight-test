import { login, info } from '@/api/index'
import { put, get, remove } from '@/utils/localStorage'

const state = {
  loginInfo: get('loginInfo') || {},
  token: get('token') || '',
  user: get('user') || {},
  access: get('access') || []
}

const mutations = {
  saveLoginInfo (state, info) {
    state.loginInfo = info
    put('loginInfo', info)
  },
  clearLoginInfo (state) {
    state.loginInfo = {}
    remove('loginInfo')
  },
  setToken (state, token) {
    state.token = token
    put('token', token, 1 * 60 * 29)
  },
  removeToken () {
    state.token = ''
    remove('token')
  },
  setUser (state, user) {
    state.user = user
  },
  setAccess (state, access) {
    state.access = access
  }
}

const actions = {
  login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      login(payload).then(res => {
        const { sessionId } = res
        commit('setToken', sessionId)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  info ({ commit }) {
    return new Promise((resolve, reject) => {
      info().then(res => {
        const { data: { user, perlist } } = res
        if (!perlist || perlist.length <= 0) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ state: 401, message: '没有访问权限' })
        }
        commit('setUser', user)
        commit('setAccess', perlist)
        resolve(perlist)
      }).catch(err => {
        reject(err)
      })
    })
  },
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('setToken', '')
      commit('setAccess', [])
    })
  },
  logout ({ commit }) {
    commit('setAccess', [])
    commit('removeToken')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
