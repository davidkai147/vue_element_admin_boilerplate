import { getInfo, login, logout } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import * as MUTATIONS from '@/enums/mutations'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  [MUTATIONS.SET_TOKEN](state, token) {
    state.token = token
  },
  [MUTATIONS.SET_INTRODUCTION](state, introduction) {
    state.introduction = introduction
  },
  [MUTATIONS.SET_NAME](state, name) {
    state.name = name
  },
  [MUTATIONS.SET_AVATAR](state, avatar) {
    state.avatar = avatar
  },
  [MUTATIONS.SET_ROLES](state, roles) {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit(MUTATIONS.SET_TOKEN, data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit(MUTATIONS.SET_ROLES, roles)
        commit(MUTATIONS.SET_NAME, name)
        commit(MUTATIONS.SET_AVATAR, avatar)
        commit(MUTATIONS.SET_INTRODUCTION, introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit(MUTATIONS.SET_TOKEN, '')
        commit(MUTATIONS.SET_ROLES, [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit(MUTATIONS.SET_TOKEN, '')
      commit(MUTATIONS.SET_ROLES, [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit(MUTATIONS.SET_TOKEN, token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
