<template>
  <v-app>
    <v-main>
      <v-container class="h-100">
        <v-form ref="form" lazy-validation @submit.prevent="login" class="h-100">
          <v-row class="h-100 justify-center align-center">
            <v-col cols="12" md="5">
              <h4 class="text--secondary caption">PANEL DE ADMINISTRACIÓN</h4>
              <h2 class="mb-12">
                VITADIAGNOSTICS
              </h2>
              <v-card class="mb-12">
                <div class="modal_header_icon blue small elevation-6">
                  <v-icon large color="#FFF">mdi-login</v-icon>
                  <!-- <img src="@/assets/user2.png" alt="" style="width:70px;"> -->
                </div>
                <v-card-title>
                  <p class="title pl-12 ml-10">
                    LOGIN
                  </p>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model.trim="form.email"
                    label="Email"
                    :rules="validations.ruleEmail"
                    prepend-icon="mdi-account-outline"
                    type="email"
                  />
                  <v-text-field
                    v-model.trim="form.password"
                    label="Contraseña"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :rules="validations.passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    hint="Longitud minima 6 caracteres"
                    @click:append="showPassword = !showPassword"
                    prepend-icon="mdi-lock-outline"
                    class="mb-4"
                  />
                  <v-btn
                    dark
                    depressed
                    :loading="loading"
                    color="primary"
                    class="mb-3"
                    type="submit"
                  >
                    Ingresar
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import api from '@/api'

export default {
  name: 'Login',
  data () {
    return {
      showPassword: false,
      loading: false,
      form: {
        email: '',
        password: ''
      },
      validations: {
        ruleEmail: [
          value => !!value || 'Campo requerido.',
          value => {
            const pattern = /^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$/
            return pattern.test(value) || 'Email no válido.'
          }
        ],
        passwordRules: [
          value => !!value || 'Campo requerido.',
          value => value.length >= 6 || 'Minimo 6 caracteres'
        ]
      }
    }
  },
  created () {
    // const cookies = this.$cookies.keys()
    // console.log(cookies)
    // console.log(this.$cookies.get('vd_token'))
  },
  methods: {
    async login () {
      if (this.$refs.form.validate()) {
        // console.log(this.form)
        try {
          const res = await api.post('/auth/login', this.form)
          console.log(res.data)
          if (res.data.token) {
            this.$store.dispatch('notify', { success: true, message: 'Bienvenido' })
            this.$store.commit('auth/SET_TOKEN', res.data.token)
            this.$router.replace({ name: 'dashboard' })
          }
        } catch (error) {
          this.$store.dispatch('notify', { success: false, message: error.response.data })
        }
      }
    }
  }
}
</script>

<style>

</style>
