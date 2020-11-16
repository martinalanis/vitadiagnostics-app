import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notification: false,
    notificationType: '',
    notificationMessage: ''
  },
  mutations: {
    SET_MESSAGE (state, payload) {
      state.notification = true
      state.notificationMessage = payload.message
      state.notificationType = payload.success ? '#0097A7' : '#E53935'
    },
    CLOSE_NOTIFICATION (state) {
      state.notification = false
      state.notificationMessage = ''
    }
  },
  actions: {
    notify ({ commit, dispatch }, payload) {
      if (payload.success) {
        // Si fue correcto se imprime mensaje
        commit('SET_MESSAGE', payload)
      } else {
        /**
         * Se valida que contenga errores enviados por api
         * payload.message se contruye desde el dispatch en front:
         *   dispatch('nitify', { success: true | false, message: response.data })
         * si contiene error son de validacion de api
         */
        if (payload.message.errors) {
          const obj = payload.message.errors
          const errors = []
          Object.keys(obj).forEach(key => {
            errors.push(obj[key])
          })
          /**
           * Se contruye objeto similar al payload original para que el commit lo pueda leer
           */
          commit('SET_MESSAGE', { success: false, message: errors.join(', ') })
        } else {
          /**
           * Cuando el error es algun fallo de la api, en la estructura manda solo parametro message con el detalle del error
           */
          commit('SET_MESSAGE', { success: false, message: payload.message.message })
        }
      }
    }
  },
  modules: {
    auth
  }
})
