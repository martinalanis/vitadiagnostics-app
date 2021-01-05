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
            detalles
          </v-btn>
          <v-menu left offset-y offset-x :nudge-right="10">
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-dots-vertical</v-icon>
            </template>
            <v-list dense class="py-0 text-right">
              <v-list-item
                v-if="isAdmin"
                link
                @click="$refs.clientForm.edit(item)"
                class="px-2 py-0 v_list_dense-h"
              >
                <v-list-item-title class="caption">Editar información</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
                @click="$refs.equipoMedicoModal.add(item)"
                class="px-2 py-0 v_list_dense-h"
              >
                <v-list-item-title class="caption">Agregar equipo médico</v-list-item-title>
              </v-list-item>
              <template v-if="isAdmin">
                <v-divider></v-divider>
                <v-list-item
                  link
                  class="px-2 py-0 v_list_dense-h red-text"
                  @click="$refs.confirmModal.openModal(`/clientes/${item.id}`)"
                >
                  <v-list-item-title class="caption">Eliminar</v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-data-table>
    <client-form ref="clientForm" @reloadTable="fetch"/>
    <confirm-modal ref="confirmModal" @reloadTable="fetch"/>
    <client-details-drawer ref="clientDetailsDrawer"/>
    <equipo-medico-modal ref="equipoMedicoModal" @reloadData="fetch"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import api from '@/api'
import ClientForm from './ClientFormModal'
import EquipoMedicoModal from '@/modules/equiposMedicos/EquiposMedicosModal'
import ConfirmModal from '@/components/ui/AdminConfirmModal'
import ClientDetailsDrawer from './ClientDetailsDrawer'
import { mapGetters } from 'vuex'

export default {
  name: 'ClientesTable',
  components: {
    ClientDetailsDrawer,
    ClientForm,
    ConfirmModal,
    EquipoMedicoModal
  },
  data () {
    return {
      EMDialog: false,
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
    },
    ...mapGetters({
      isAdmin: 'auth/isAdmin'
    })
  },
  methods: {
    async fetch () {
      this.loading = true
      try {
        this.clientesData = await api.get('/clientes').then(res => res.data)
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
