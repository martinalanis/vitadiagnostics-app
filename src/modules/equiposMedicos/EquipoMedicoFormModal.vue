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
        <v-icon x-large color="#FFF">mdi-prescription</v-icon>
      </div>
      <v-card-title>
        <p class="subtitle-1 form_title form_title--small lh-1">
          <!-- <span class="text--secondary">{{ cliente }}</span><br> -->
          <span v-if="editMode">EDITAR</span>
          <span v-else>AGREGAR</span>
          EQUIPO MÉDICO
        </p>
      </v-card-title>
        <!-- <v-divider></v-divider> -->
        <v-card-text class="relative">
          <v-row>
            <v-col cols="12" class="py-1">
              <v-select
                v-model="form.cliente_id"
                label="Cliente"
                clearable
                :items="clientes"
                :rules="validations.req"
                :loading="loading"
                item-text="nombre"
                item-value="id"
              ></v-select>
            </v-col>
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
import { EquipoMedico } from '@/interfaces'
import api from '@/api'

export default {
  name: 'EquipoMedicoFormModal',
  data () {
    return {
      dialog: false,
      editMode: false,
      loading: false,
      disableButton: false,
      loadingButton: false,
      form: new EquipoMedico(),
      modalidades: [],
      clientes: [],
      validations: {
        req: [
          value => !!value || 'Campo requerido.'
        ]
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async edit (id) {
      this.loading = true
      this.disableButton = true
      // this.form = new EquipoMedico()
      this.openModal(true)
      // console.log('id', id)
      try {
        const equipoMedico = await api.get(`/equipos-medicos/${id}`)
        this.form = equipoMedico.data
        this.loading = false
        this.disableButton = false
      } catch (error) {
        this.loading = false
        this.disableButton = false
        this.form = new EquipoMedico()
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    },
    add () {
      this.loading = false
      this.disableButton = false
      this.form = new EquipoMedico()
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
            this.$emit('reloadTable')
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
    },
    async getData () {
      try {
        const em = await api.get('/equipos-medicos/modalidades')
        const clientes = await api.get('/clientes/list')
        this.modalidades = em.data
        this.clientes = clientes.data
      } catch (error) {
        this.$store.dispatch('notify', { success: false, message: error.response.data })
        this.$emit('close')
      }
    }
  }
}
</script>
