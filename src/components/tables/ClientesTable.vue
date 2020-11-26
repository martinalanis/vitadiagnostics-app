<template>
  <div>
    <v-row class="align-center mb-2">
      <v-col cols="auto" md="7">
        <v-text-field
          v-model="search"
          label="Buscar en clientes"
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
          @click="$refs.clientForm.add()"
          class="d-none d-md-block caption"
        >
          <v-icon left small>mdi-account</v-icon>
          agregar cliente
        </v-btn>
        <v-btn
          dark
          fab
          small
          color="purple"
          @click="$refs.clientForm.add()"
          class="d-block d-md-none"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="clientes"
      :loading="loading"
      :search="search"
      sort-by="nombre"
      show-expand
      single-expand
      class="elevation-2"
    >
      <template #item.id="{ item }">
        <div class="d-flex align-center justify-end h-100">
          <v-btn
            text
            x-small
            color="primary"
            @click="$refs.clientDetailsDrawer.show(item)"
          >
            ver
          </v-btn>
          <v-btn
            text
            x-small
            color="primary"
            @click="$refs.clientForm.edit(item.id)"
          >
            editar
          </v-btn>
          <v-btn
            text
            x-small
            color="red"
            @click="$refs.confirmModal.openModal(`/clientes/${item.id}`)"
          >
            eliminar
          </v-btn>
        </div>
      </template>
      <!-- <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <client-details :item="item"/>
        </td>
      </template> -->
    </v-data-table>
    <client-form ref="clientForm" @reloadTable="fetch"/>
    <confirm-modal ref="confirmModal" @reloadTable="fetch"/>
    <client-details-drawer ref="clientDetailsDrawer"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import api from '@/api'
import ClientForm from '@/components/modals/ClientFormModal'
import ConfirmModal from '@/components/modals/ConfirmModal'
import ClientDetailsDrawer from '@/components/ui/ClientDetailsDrawer'

export default {
  name: 'UsuariosTable',
  components: {
    ClientDetailsDrawer,
    ClientForm,
    ConfirmModal
  },
  data () {
    return {
      clientesData: [],
      headers: [
        {
          text: 'Nombre',
          value: 'nombre'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Telefonos',
          value: 'telefonos'
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
  created () {
    this.fetch()
  },
  computed: {
    clientes () {
      return this.clientesData.map(obj => {
        return {
          ...obj,
          createdAt: dayjs(obj.created_at).format('DD/MM/YYYY HH:mm:ss') || '',
          lastModified: dayjs(obj.updated_at).format('DD/MM/YYYY HH:mm:ss') || ''
        }
      })
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      try {
        const clientes = await api.get('/clientes')
        this.clientesData = clientes.data
        // console.log(clientes.data)
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    }
  }
}
</script>

<style>

</style>
