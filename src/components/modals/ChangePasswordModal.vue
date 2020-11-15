<template>
  <v-dialog v-model="dialog" max-width="420">
    <v-card>
      <v-card-title class="mb-3">
        <h5><v-icon color="blue darken-2" left>mdi-lock-outline</v-icon>Ingrese la nueva contraseña</h5>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="remove" lazy-validation>
          <v-text-field
            v-model="password"
            placeholder="******"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            hint="Longitud minima 6 caracteres"
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
              color="primary"
              depressed
              type="submit"
              :loading="loading"
            >
              Cambiar contraseña
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
  name: 'ChangePasswordModal',
  data () {
    return {
      dialog: false,
      id: '',
      password: '',
      showPassword: false,
      passwordRules: [
        value => !!value || 'Campo requerido.',
        value => value.length >= 6 || 'Minimo 6 caracteres'
      ],
      loading: false
    }
  },
  methods: {
    async remove () {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          const res = await api.post(`/change-password/${this.id}`, { password: this.password })
          this.$store.dispatch('notify', { success: true, message: res.data })
          this.$emit('reloadUsers')
          this.closeModal()
        } catch (error) {
          this.loading = false
          this.$store.dispatch('notify', { success: false, message: error.response.data })
        }
      }
    },
    openModal (id) {
      this.dialog = true
      this.password = ''
      this.id = id
      this.loading = false
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 100)
    },
    closeModal () {
      this.dialog = false
      this.id = ''
      this.password = ''
      this.showPassword = false
      this.loading = false
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 100)
    }
  }
}
</script>
