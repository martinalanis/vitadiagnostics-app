<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    max-width="600px"
    content-class="d_content_overflow_visible"
  >
    <v-form ref="form" lazy-validation @submit.prevent="save">
      <v-card>
        <div class="modal_header_icon blue elevation-6">
          <v-icon x-large color="#FFF">mdi-account</v-icon>
          <!-- <img src="@/assets/user2.png" alt="" style="width:70px;"> -->
        </div>
        <v-card-title>
          <p class="title form_title">
            <span v-if="editMode">EDITAR</span>
            <span v-else>NUEVO</span>
            CLIENTE
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
            <v-col cols="6" class="py-1">
              <v-text-field
                v-model.trim="form.razon_social"
                label="Razón Social"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="6" class="py-1">
              <v-text-field
                v-model.trim="form.email"
                label="Email"
                :rules="validations.ruleEmail"
                :loading="loading"
                type="email"
              />
            </v-col>
            <v-col cols="12" class="py-1">
              <v-textarea
                v-model.trim="form.direccion"
                label="Dirección"
                :rules="validations.ruleAddress"
                :loading="loading"
                hint="Caracteres permitidos: . - #"
                rows="1"
                auto-grow
              />
            </v-col>
            <v-col cols="4" class="py-1">
              <v-text-field
                v-model.trim="form.telefonos"
                label="Teléfono"
                :rules="validations.ruleTelephone"
                :error-count="2"
                :loading="loading"
                type="tel"
              />
            </v-col>
            <v-col cols="4" class="py-1">
              <v-text-field
                v-model.trim="form.rfc"
                label="RFC"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="4" class="py-1">
              <v-text-field
                v-model.trim="form.cp"
                label="C.P"
                :rules="validations.ruleCp"
                :loading="loading"
              />
            </v-col>
          </v-row>
          <v-row class="justify-space-between">
            <v-col cols="6" class="py-1">
              <v-select
                v-model="form.estado"
                label="Estado"
                :items="estados"
                :rules="validations.req"
                :loading="loading"
                clearable
              />
            </v-col>
            <v-col cols="6" class="py-1">
              <v-select
                v-model="form.municipio"
                :items="municipios"
                label="Municipio"
                :rules="validations.req"
                :loading="loading"
                :disabled="!this.form.estado"
                clearable
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
import { Client } from '@/interfaces'
import api from '@/api'
import EstadosMunicipios from '@/utils/EstadosMunicipios.json'

export default {
  name: 'ClientFormModal',
  data () {
    return {
      dialog: false,
      editMode: false,
      loading: false,
      disableButton: false,
      loadingButton: false,
      form: new Client(),
      validations: {
        req: [
          value => !!value || 'Campo requerido.'
        ],
        ruleAlpha: [
          value => !!value || 'Campo requerido.',
          value => {
            const pattern = /^[A-Za-z0-9]*[A-Za-z0-9][A-Za-z0-9\s]*$/
            return pattern.test(value) || 'Formato no válido.'
          }
        ],
        ruleAlphaDot: [
          value => !!value || 'Campo requerido.',
          value => {
            const pattern = /^[A-Za-z0-9]*[A-Za-z0-9(.)?][A-Za-z0-9(.)?(\-)?\s]*$/
            return pattern.test(value) || 'Formato no válido.'
          }
        ],
        ruleAddress: [
          value => !!value || 'Campo requerido.',
          value => {
            const pattern = /^[A-Za-z0-9]*[A-Za-z0-9(.)?][A-Za-z0-9(.)?(#)?(\-)?\s]*$/
            return pattern.test(value) || 'Formato no válido.'
          }
        ],
        ruleCp: [
          value => !!value || 'Campo requerido.',
          value => {
            if (value.length) {
              const pattern = /^[0-9]{5}$/
              return pattern.test(value) || 'CP no válido.'
            }
            return false
          }
        ],
        ruleNumber: [
          value => !!value || 'Campo requerido.',
          value => {
            const pattern = /^[0-9]+$/
            return pattern.test(value) || 'Ingresa solo números.'
          }
        ],
        ruleTelephone: [
          value => !!value || 'Campo requerido.',
          value => (value || '').length <= 10 || 'Max 10 caracteres',
          value => {
            const pattern = /^[0-9]+$/
            return pattern.test(value) || 'Ingresa solo números.'
          }
        ],
        ruleEmail: [
          value => !!value || 'Campo requerido.',
          value => {
            // const pattern = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/
            const pattern = /^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$/
            return pattern.test(value) || 'Email no válido.'
          }
        ]
      }
    }
  },
  computed: {
    estados () {
      return EstadosMunicipios.map(row => row.nombre)
    },
    municipios () {
      return EstadosMunicipios
        .filter(row => row.nombre === this.form.estado)
        .map(estado => estado.municipios)
        .reduce((previous, current) => previous.concat(current), [])
        .sort()
    }
  },
  methods: {
    async edit (id) {
      this.loading = true
      this.disableButton = true
      // this.form = new Client()
      this.openModal(true)
      // console.log('id', id)
      try {
        const cliente = await api.get(`/clientes/${id}`)
        this.form = cliente.data
        this.loading = false
        this.disableButton = false
      } catch (error) {
        this.loading = false
        this.disableButton = false
        this.form = new Client()
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    },
    add () {
      this.loading = false
      this.disableButton = false
      this.form = new Client()
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
      this.form = new Client()
      this.editMode = false
      this.disableButton = false
      this.loading = false
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 100)
      this.dialog = false
    },
    async save () {
      if (this.$refs.form.validate()) {
        // console.log('save')
        this.loadingButton = true
        try {
          const res = this.editMode
            ? await api.put(`/clientes/${this.form.id}`, this.form)
            : await api.post('/clientes', this.form)
          if (res.status === 200) {
            this.$store.dispatch('notify', { success: true, message: res.data })
            this.$emit('reloadTable')
            // this.dialog = false
            this.closeModal()
          }
          this.loadingButton = false
          this.form = new Client()
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
