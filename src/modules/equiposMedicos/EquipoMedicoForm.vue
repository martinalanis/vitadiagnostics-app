<template>
  <v-form ref="form" lazy-validation @submit.prevent="save">
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
      <v-col cols="12" class="py-1">
        <v-text-field
          v-model.trim="form.fabricante"
          label="Fabricante"
          :rules="validations.req"
          :loading="loading"
        />
      </v-col>
      <v-col cols="12" class="py-1">
        <v-select
          v-model="form.modalidad_id"
          label="Modalidades"
          clearable
          :items="modalidades"
          :rules="validations.req"
          :loading="loading"
          item-text="tag"
          item-value="id"
        ></v-select>
      </v-col>
      <v-col cols="12" class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn
          color="#656565"
          text
          small
          type="reset"
          @click="$emit('cancel')"
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
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { EquipoMedico } from '@/interfaces'
import api from '@/api'

export default {
  name: 'EquipoMedicoForm',
  data () {
    return {
      editMode: false,
      loading: false,
      disableButton: false,
      loadingButton: false,
      form: new EquipoMedico(),
      modalidades: [],
      validations: {
        req: [
          value => !!value || 'Campo requerido.'
        ]
      }
    }
  },
  created () {
    this.getModalidades()
  },
  methods: {
    async edit (id) {
      this.loading = true
      this.disableButton = true
      // this.form = new EquipoMedico()
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
        this.form = new EquipoMedico()
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    },
    async getModalidades () {
      try {
        this.modalidades = await api.get('/equipos-medicos/modalidades').then(res => res.data)
        // console.log(res.data)
        // this.modalidades = res.data
      } catch (error) {
        this.$store.dispatch('notify', { success: false, message: error.response.data })
        this.$emit('close')
      }
    },
    add (cliente) {
      this.loading = false
      this.disableButton = false
      this.editMode = false
      this.form = new EquipoMedico()
      this.form.cliente_id = cliente
      // this.openModal(false)
    },
    openModal (edit) {
      this.editMode = edit
      // setTimeout(() => {
      //   this.$refs.form.resetValidation()
      // }, 100)
    },
    closeModal () {
      this.form = new EquipoMedico()
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
            ? await api.put(`/equipos-medicos/${this.form.id}`, this.form)
            : await api.post('/equipos-medicos', this.form)
          if (res.status === 200) {
            this.$store.dispatch('notify', { success: true, message: res.data })
            this.$emit('reloadData')
            this.closeModal()
          }
          this.loadingButton = false
          this.form = new EquipoMedico()
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
