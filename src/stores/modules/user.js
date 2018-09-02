import {getUserInfo} from '@/api/user'

const state = {
  userInfo: {}
}

const getters = {
  userInfo: state => state.userInfo
}

const actions = {
  getUserInfo ({commit}) {
    getUserInfo().then((response) => {
      if (response.data.status === 200) {
        let data = response.data.data
        commit('getUserInfo', data)
      } else {
        commit('clearUserInfo')
      }
    })
  },
  updateUserInfo ({commit}, {userInfo}) {
    commit('updateUserInfo', {userInfo})
  }
}

const mutations = {
  getUserInfo (state, userInfo) {
    state.userInfo = {...userInfo}
  },
  updateUserInfo (state) {
    state.userInfo = {}
  },
  clearUserInfo (state) {
    state.userInfo = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
