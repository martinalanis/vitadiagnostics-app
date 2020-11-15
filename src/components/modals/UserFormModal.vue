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
            USUARIO
          </p>
        </v-card-title>
        <!-- <v-divider></v-divider> -->
        <v-card-text class="relative">
          <v-row>
            <v-col cols="12" class="py-1">
              <v-text-field
                v-model.trim="user.nombre"
                label="Nombre"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="6" class="py-1">
              <v-text-field
                v-model.trim="user.titulo"
                label="Titulo"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="6" class="py-1">
              <v-text-field
                v-model.trim="user.email"
                label="Email"
                :rules="validations.ruleEmail"
                :loading="loading"
                type="email"
              />
            </v-col>
            <v-col cols="12" class="py-1">
              <v-textarea
                v-model.trim="user.direccion"
                label="Dirección"
                :rules="validations.req"
                :loading="loading"
                rows="1"
                auto-grow
              />
            </v-col>
            <v-col cols="4" class="py-1">
              <v-text-field
                v-model.trim="user.telefono"
                label="Teléfono"
                :rules="validations.ruleNumber"
                :loading="loading"
                type="tel"
              />
            </v-col>
            <v-col cols="4" class="py-1">
              <v-text-field
                v-model.trim="user.rfc"
                label="RFC"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="4" class="py-1">
              <v-text-field
                v-model.trim="user.cp"
                label="C.P"
                :rules="validations.ruleCp"
                :loading="loading"
              />
            </v-col>
          </v-row>
          <v-row class="justify-space-between">
            <v-col cols="6" class="py-1">
              <v-select
                v-model="user.estado"
                label="Estado"
                :items="estados"
                :rules="validations.req"
                :loading="loading"
                clearable
              />
            </v-col>
            <v-col cols="6" class="py-1">
              <v-select
                v-model="user.municipio"
                :items="municipios"
                label="Municipio"
                :rules="validations.req"
                :loading="loading"
                :disabled="!this.user.estado"
                clearable
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5" class="py-1">
              <v-select
                v-model="user.rol_id"
                :items="roles"
                label="Roles"
                item-text="nombre"
                item-value="id"
                :rules="validations.req"
              />
            </v-col>
            <v-col cols="auto" class="py-1">
              <v-radio-group
                  v-model="user.estatus"
                  row
                >
                  <v-radio
                    label="Activo"
                    :value="1"
                  ></v-radio>
                  <v-radio
                    label="Inactivo"
                    :value="0"
                  ></v-radio>
                </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="!editMode">
            <v-col cols="5">
              <v-text-field
                v-model.trim="user.password"
                label="Contraseña"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="validations.passwordRules"
                :type="showPassword ? 'text' : 'password'"
                hint="Longitud minima 6 caracteres"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col class="d-flex align-center justify-end">
              <p class="mb-0 text-right subtitle-2">
                <small><i>*Todos los campos son requeridos</i></small>
              </p>
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
import { User } from '@/interfaces'
import api from '@/api'
// import estadosMunicipiosMixin from '@/mixins/estadosMunicipiosMixin'
import EstadosMunicipios from '@/utils/EstadosMunicipios.json'

export default {
  name: 'UserFormModal',
  // mixins: [estadosMunicipiosMixin],
  props: {
    roles: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      dialog: false,
      editMode: false,
      loading: false,
      disableButton: false,
      loadingButton: false,
      showPassword: false,
      user: new User(),
      validations: {
        req: [
          value => !!value || 'Campo requerido.'
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
        ruleEmail: [
          value => !!value || 'Campo requerido.',
          value => {
            // const pattern = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/
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
  computed: {
    estados () {
      return EstadosMunicipios.map(row => row.nombre)
    },
    municipios () {
      return EstadosMunicipios
        .filter(row => row.nombre === this.user.estado)
        .map(estado => estado.municipios)
        .reduce((previous, current) => previous.concat(current), [])
        .sort()
    }
  },
  methods: {
    async edit (id) {
      this.loading = true
      this.disableButton = true
      // this.user = new User()
      this.openModal(true)
      // console.log('id', id)
      try {
        const usuario = await api.get(`/users/${id}`)
        this.user = usuario.data
        this.loading = false
        this.disableButton = false
      } catch (error) {
        this.loading = false
        this.disableButton = false
        this.user = new User()
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    },
    add () {
      this.loading = false
      this.disableButton = false
      this.user = new User()
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
      this.user = new User()
      this.editMode = false
      this.disableButton = false
      this.loading = false
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 100)
    },
    async save () {
      if (this.$refs.form.validate()) {
        console.log('save')
        this.loadingButton = true
        try {
          const res = this.editMode
            ? await api.put(`/users/${this.user.id}`, this.user)
            : await api.post('/users', this.user)
          if (res.status === 200) {
            this.$store.dispatch('notify', { success: true, message: res.data })
            this.$emit('reloadUsers')
            // this.dialog = false
            this.closeModal()
          }
          this.loadingButton = false
          this.user = new User()
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
