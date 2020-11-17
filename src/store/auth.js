import Cookies from 'js-cookie'
import router from '@/router'
import api from '@/api'

export default {
  namespaced: true,
  state: {
    token: Cookies.get('vd_token') || '',
    user: {}
  },
  getters: {
    isLogged (state) {
      return !!state.token
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      Cookies.set('vd_token', token, { expires: 0.5 })
      state.token = token
    },
    SET_USER (state, user) {
      state.user = user
    },
    DESTROY_TOKEN (state) {
      Cookies.remove('vd_token')
      state.token = null
      state.user = {}
    }
  },
  actions: {
    async logout ({ dispatch }) {
      try {
        const res = await api.post('/auth/logout')
        dispatch('notify', { success: true, message: res.data }, { root: true })
        dispatch('closeSession')
      } catch (error) {
        dispatch('notify', { success: false, message: error.response.data }, { root: true })
      }
    },
    closeSession ({ commit }) {
      // dispatch('notify', { success: true, message: message }, { root: true })
      commit('DESTROY_TOKEN')
      router.push({ name: 'login' })
    }
  }
}
