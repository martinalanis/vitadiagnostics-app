<template>
  <div>
    <v-row class="align-center mb-2">
      <v-col cols="auto" md="8">
        <v-text-field
          v-model="search"
          label="Buscar en refacciones"
          prepend-inner-icon="mdi-magnify"
          hide-details
          clearable
          solo
        />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn
          dark
          outlined
          color="blue darken-4"
          @click="$refs.refaccionesForm.add()"
          class="d-none d-md-block caption"
        >
          <v-icon left small>mdi-tag</v-icon>
          agregar refaccion
        </v-btn>
        <v-btn
          dark
          fab
          small
          color="purple"
          @click="$refs.refaccionesForm.add()"
          class="d-block d-md-none"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="refacciones"
      :loading="loading"
      :search="search"
      sort-by="id"
      sort-desc
      class="elevation-2"
    >
      <template #item.id="{ item }" v-if="isAdmin">
        <div class="d-flex align-center justify-end h-100">
          <v-btn
            text
            x-small
            color="primary"
            @click="$refs.refaccionesForm.edit(item.id)"
          >editar</v-btn>
          <v-btn
            text
            x-small
            color="error"
            @click="$refs.confirmModal.open(item.nombre, item.id)"
          >eliminar</v-btn>
        </div>
      </template>
    </v-data-table>
    <refacciones-form ref="refaccionesForm" @reloadTable="fetch"/>
    <confirm-single-modal ref="confirmModal" @confirm="remove"/>
  </div>
</template>

<script>
import api from '@/api'
import RefaccionesForm from './RefaccionesFormModal'
import ConfirmSingleModal from '@/components/ui/ConfirmSingleModal'
import { mapGetters } from 'vuex'

export default {
  name: 'RefaccionesTable',
  components: {
    RefaccionesForm,
    ConfirmSingleModal
  },
  data () {
    return {
      refacciones: [],
      initialHeaders: [
        {
          text: 'Nombre',
          value: 'nombre'
        },
        {
          text: 'No. Parte',
          value: 'num_parte'
        },
        {
          text: 'Modalidad',
          value: 'modalidad.nombre'
        },
        {
          text: '',
          value: 'id',
          sortable: false
        }
      ],
      search: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'auth/isAdmin'
    }),
    headers () {
      /**
       * Ocultar columna de edicion en los headers
       * En el template se verifica si es admin para no agregar los botones de edicion en cada fila
       */
      return this.isAdmin ? this.initialHeaders : this.initialHeaders.filter(row => row.value !== 'id')
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      try {
        this.refacciones = await api.get('/refacciones').then(res => res.data)
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    },
    async remove (id) {
      try {
        const res = await api.delete(`/refacciones/${id}`)
        this.$store.dispatch('notify', { success: true, message: res.data })
        this.fetch()
      } catch (error) {
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    }
  }
}
</script>
