import Cookies from 'js-cookie'

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
  }
}
