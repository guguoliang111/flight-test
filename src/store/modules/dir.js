import { dirList } from '@/api/api'

const state = {
  list: []
}

const mutations = {
  setDir (state, list) {
    state.list = list
  }
}

const actions = {
  async getDir ({ commit }) {
    const { data } = await dirList()
    commit('setDir', data.dir)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
