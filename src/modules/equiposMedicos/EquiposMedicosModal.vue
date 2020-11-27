<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    eager
    max-width="350px"
    content-class="d_content_overflow_visible"
  >
    <v-card>
      <div class="modal_header_icon blue elevation-6">
        <v-icon x-large color="#FFF">mdi-tag</v-icon>
      </div>
      <v-card-title>
        <p class="subtitle-2 form_title form_title--small lh-1">
          <span class="text--secondary">{{ cliente }}</span><br>
          <span v-if="editMode">EDITAR</span>
          <span v-else>AGREGAR</span>
          EQUIPO MÉDICO
        </p>
      </v-card-title>
      <!-- <v-divider></v-divider> -->
      <v-card-text class="relative">
        <equipo-medico-form
          @reloadData="reloadData"
          @cancel="dialog = false"
          ref="equipoMedicoForm"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// import api from '@/api'
import EquipoMedicoForm from './EquipoMedicoForm'
export default {
  name: 'EquipoMedicoModal',
  components: {
    EquipoMedicoForm
  },
  data () {
    return {
      dialog: false,
      editMode: false,
      loading: false,
      cliente: ''
    }
  },
  methods: {
    async edit (id) {
      this.loading = true
      this.openModal(true)
      // console.log('id', id)
      // try {
      //   const refaccion = await api.get(`/refacciones/${id}`)
      //   this.form = refaccion.data
      //   this.loading = false
      //   this.disableButton = false
      // } catch (error) {
      //   this.loading = false
      //   this.disableButton = false
      //   this.form = new Refaccion()
      //   this.$store.dispatch('notify', { success: false, message: error.response.data })
      // }
    },
    add (cliente) {
      this.loading = false
      this.editMode = false
      this.dialog = true
      this.clienteId = cliente
      this.$refs.equipoMedicoForm.add(cliente.id)
      this.cliente = cliente.nombre
    },
    reloadData () {
      this.$emit('reloadData')
      this.dialog = false
    }
    // closeModal () {
    //   this.dialog = false
    //   this.form = new Refaccion()
    //   this.editMode = false
    //   this.disableButton = false
    //   this.loading = false
    //   setTimeout(() => {
    //     this.$refs.form.resetValidation()
    //   }, 100)
    // },
    // async save () {
    //   if (this.$refs.form.validate()) {
    //     this.loadingButton = true
    //     try {
    //       const res = this.editMode
    //         ? await api.put(`/refacciones/${this.form.id}`, this.form)
    //         : await api.post('/refacciones', this.form)
    //       if (res.status === 200) {
    //         this.$store.dispatch('notify', { success: true, message: res.data })
    //         this.$emit('reloadTable')
    //         this.closeModal()
    //       }
    //       this.loadingButton = false
    //       this.form = new Refaccion()
    //     } catch (error) {
    //       this.loadingButton = false
    //       this.$store.dispatch('notify', { success: false, message: error.response.data })
    //     }
    //   } else {
    //     this.$store.dispatch('notify', { success: false, message: { message: 'Completa los campos requeridos' } })
    //   }
    // }
  }
}
</script>
