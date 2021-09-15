<template>
  <div>
    <v-row class="align-center mb-2">
      <v-col cols="auto" md="8">
        <v-text-field
          v-model="search"
          label="Buscar en cotizaciones"
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
          class="d-none d-md-block caption"
        >
          <v-icon left small>mdi-text-box-plus-outline</v-icon>
          nueva cotización
        </v-btn>
        <v-btn
          dark
          fab
          small
          color="purple"
          class="d-block d-md-none"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="cotizaciones"
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
          >editar {{ item.id }}</v-btn>
          <v-btn
            text
            x-small
            color="error"
          >eliminar</v-btn>
        </div>
      </template>
    </v-data-table>
    <confirm-single-modal ref="confirmModal" @confirm="remove"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import api from '@/api'
import ConfirmSingleModal from '@/components/ui/ConfirmSingleModal'
import { mapGetters } from 'vuex'

export default {
  name: 'RefaccionesTable',
  components: {
    ConfirmSingleModal
  },
  data () {
    return {
      cotizacionesData: [],
      initialHeaders: [
        {
          text: 'Cliente',
          value: 'cliente.nombre'
        },
        {
          text: 'Tipo',
          value: 'tipo.nombre'
        },
        {
          text: 'Estatus',
          value: 'estatus'
        },
        {
          text: 'Fecha',
          value: 'fecha'
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
    cotizaciones () {
      return this.cotizacionesData.map(ct => {
        return {
          ...ct,
          fecha: dayjs(ct.fecha).format('DD/MM/YYYY HH:mm:ss') || ''
        }
      })
    },
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
        this.cotizacionesData = await api.get('/cotizaciones').then(res => res.data)
        console.log('cotizaciones', this.cotizaciones)
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
