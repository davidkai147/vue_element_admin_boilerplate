import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'
import * as MUTATIONS from '@/enums/mutations'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  [MUTATIONS.TOGGLE_SIDEBAR](state) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  [MUTATIONS.CLOSE_SIDEBAR](state, withoutAnimation) {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [MUTATIONS.TOGGLE_DEVICE](state, device) {
    state.device = device
  },
  [MUTATIONS.SET_LANGUAGE](state, language) {
    state.language = language
    Cookies.set('language', language)
  },
  [MUTATIONS.SET_SIZE](state, size) {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit(MUTATIONS.TOGGLE_SIDEBAR)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit(MUTATIONS.CLOSE_SIDEBAR, withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit(MUTATIONS.TOGGLE_DEVICE, device)
  },
  setLanguage({ commit }, language) {
    commit(MUTATIONS.SET_LANGUAGE, language)
  },
  setSize({ commit }, size) {
    commit(MUTATIONS.SET_SIZE, size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
