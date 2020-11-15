<template>
  <v-dialog v-model="dialog" max-width="420">
    <v-card>
      <v-card-title class="mb-3">
        <h5><v-icon color="error" left>mdi-exclamation</v-icon>SE REQUIERE CONFIRMACIÓN</h5>
      </v-card-title>
      <v-card-subtitle>
        <p class="mb-0 pl-2">
          Ingrese su contraseña de administrador para continuar
        </p>
      </v-card-subtitle>
      <v-card-text>
        <v-form ref="form" @submit.prevent="remove" lazy-validation>
          <v-text-field
            v-model="password"
            placeholder="******"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          />
          <div class="text-right mt-4">
            <v-btn
              text
              small
              type="reset"
              @click="dialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="error"
              depressed
              type="submit"
              :loading="loading"
            >
              Eliminar
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '@/api'

export default {
  name: 'ConfirmModal',
  data () {
    return {
      dialog: false,
      route: '',
      password: '',
      showPassword: false,
      passwordRules: [
        value => !!value || 'Campo requerido.'
      ],
      loading: false
    }
  },
  methods: {
    async remove () {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          const confrimationResponse = await api.post('admin-confirm', { password: this.password })
          if (confrimationResponse.data.success) {
            const deleteResponse = await api.delete(this.route)
            this.$store.dispatch('notify', { success: true, message: deleteResponse.data })
            this.$emit('reloadUsers')
            this.closeModal()
          }
          this.loading = false
        } catch (error) {
          this.loading = false
          this.$store.dispatch('notify', { success: false, message: error.response.data })
        }
      }
    },
    openModal (route) {
      this.dialog = true
      this.route = route
      this.password = ''
      this.loading = false
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 100)
    },
    closeModal () {
      this.dialog = false
      this.route = ''
      this.password = ''
      this.showPassword = false
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 100)
    }
  }
}
</script>
