<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    max-width="350px"
    content-class="d_content_overflow_visible"
  >
    <v-form ref="form" lazy-validation @submit.prevent="save">
      <v-card>
        <div class="modal_header_icon blue elevation-6">
          <v-icon x-large color="#FFF">mdi-tag</v-icon>
        </div>
        <v-card-title>
          <p class="title form_title">
            <span v-if="editMode">EDITAR</span>
            <span v-else>NUEVA</span>
            REFACCIÓN
          </p>
        </v-card-title>
        <!-- <v-divider></v-divider> -->
        <v-card-text class="relative">
          <v-row>
            <v-col cols="12" class="py-1">
              <v-text-field
                v-model.trim="form.nombre"
                label="Nombre"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="12" class="py-1">
              <v-text-field
                v-model.trim="form.modelo"
                label="Modelo"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="12" class="py-1">
              <v-text-field
                v-model.trim="form.serie"
                label="Serie"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-spacer></v-spacer>
          <v-btn
            color="#656565"
            text
            small
            type="reset"
            @click="closeModal"
          >
            cancelar
          </v-btn>
          <v-btn
            color="primary"
            :dark="disableButton ? false : true"
            type="submit"
            :loading="loadingButton"
            :disabled="disableButton"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { Refaccion } from '@/interfaces'
import api from '@/api'

export default {
  name: 'RefaccionesFormModal',
  data () {
    return {
      dialog: false,
      editMode: false,
      loading: false,
      disableButton: false,
      loadingButton: false,
      form: new Refaccion(),
      validations: {
        req: [
          value => !!value || 'Campo requerido.'
        ]
      }
    }
  },
  methods: {
    async edit (id) {
      this.loading = true
      this.disableButton = true
      // this.form = new Refaccion()
      this.openModal(true)
      // console.log('id', id)
      try {
        const refaccion = await api.get(`/refacciones/${id}`)
        this.form = refaccion.data
        this.loading = false
        this.disableButton = false
      } catch (error) {
        this.loading = false
        this.disableButton = false
        this.form = new Refaccion()
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    },
    add () {
      this.loading = false
      this.disableButton = false
      this.form = new Refaccion()
      this.openModal(false)
    },
    openModal (edit) {
      this.dialog = true
      this.editMode = edit
      // setTimeout(() => {
      //   this.$refs.form.resetValidation()
      // }, 100)
    },
    closeModal () {
      this.dialog = false
      this.form = new Refaccion()
      this.editMode = false
      this.disableButton = false
      this.loading = false
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 100)
    },
    async save () {
      if (this.$refs.form.validate()) {
        this.loadingButton = true
        try {
          const res = this.editMode
            ? await api.put(`/refacciones/${this.form.id}`, this.form)
            : await api.post('/refacciones', this.form)
          if (res.status === 200) {
            this.$store.dispatch('notify', { success: true, message: res.data })
            this.$emit('reloadTable')
            this.closeModal()
          }
          this.loadingButton = false
          this.form = new Refaccion()
        } catch (error) {
          this.loadingButton = false
          this.$store.dispatch('notify', { success: false, message: error.response.data })
        }
      } else {
        this.$store.dispatch('notify', { success: false, message: { message: 'Completa los campos requeridos' } })
      }
    }
  }
}
</script>
