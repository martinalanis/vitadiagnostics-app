<template>
  <div>
    <v-row class="align-center mb-2">
      <v-col cols="auto" md="8">
        <v-text-field
          v-model="search"
          label="Buscar"
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
          @click="$refs.userForm.add()"
          class="d-none d-md-block caption"
        >
          <v-icon left small>mdi-account</v-icon>
          agregar usuario
        </v-btn>
        <v-btn
          dark
          fab
          small
          color="purple"
          @click="$refs.userForm.add()"
          class="d-block d-md-none"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      :loading="loading"
      :search="search"
      sort-by="nombre"
      show-expand
      single-expand
      class="elevation-2"
    >
      <template #item.rol.nombre="{ item }">
        <v-chip label small :color="item.rolColor">{{ item.rol }}</v-chip>
      </template>
      <template #item.estatus="{ item }">
        <v-chip label small :color="item.estatusColor">
          {{ item.estatus }}
        </v-chip>
      </template>
      <template #item.id="{ item }">
        <div class="d-flex align-center justify-end h-100">
          <v-btn
            text
            x-small
            color="primary"
            @click="$refs.userForm.edit(item.id)"
          >editar</v-btn>
          <v-menu left offset-y offset-x :nudge-right="10">
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-dots-vertical</v-icon>
            </template>
            <v-list dense class="py-0 text-right">
              <v-list-item link @click="$refs.changePasswordModal.openModal(item.id)" class="px-2 py-0 v_list_dense-h">
                <v-list-item-title class="caption">Cambiar contraseña</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                link
                class="px-2 py-0 v_list_dense-h red-text"
                @click="$refs.confirmModal.openModal(`/users/${item.id}`)"
              >
                <v-list-item-title class="caption">Eliminar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <user-details :user="item"/>
        </td>
      </template>
    </v-data-table>
    <!-- <user-details :user="usuarios[0]"/> -->
    <user-form ref="userForm" :roles="roles" @reloadTable="fetch"/>
    <confirm-modal ref="confirmModal" @reloadTable="fetch"/>
    <change-password-modal ref="changePasswordModal" @reloadTable="fetch"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import api from '@/api'
import UserForm from '@/components/modals/UserFormModal'
import UserDetails from '@/components/ui/UserDetails'
import ConfirmModal from '@/components/modals/ConfirmModal'
import ChangePasswordModal from '@/components/modals/ChangePasswordModal'

export default {
  name: 'UsuariosTable',
  components: {
    ChangePasswordModal,
    ConfirmModal,
    UserDetails,
    UserForm
  },
  data () {
    return {
      usuariosData: [],
      roles: [],
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
          text: 'Telefono',
          value: 'telefono'
        },
        {
          text: 'Rol',
          value: 'rol.nombre'
        },
        {
          text: 'Estatus',
          value: 'estatus'
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
    usuarios () {
      return this.usuariosData.map(us => {
        return {
          ...us,
          estatus: us.estatus ? 'activo' : 'inactivo',
          estatusColor: us.estatus ? 'success' : 'disabled',
          rol: us.rol.nombre || '',
          rolColor: this.getRolColor(us.rol.id),
          createdAt: dayjs(us.created_at).format('DD/MM/YYYY HH:mm:ss') || '',
          lastModified: dayjs(us.updated_at).format('DD/MM/YYYY HH:mm:ss') || ''
        }
      })
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      try {
        const users = await api.get('/users')
        const roles = await api.get('/roles')
        this.usuariosData = users.data
        this.roles = roles.data
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    },
    getRolColor (id) {
      switch (id) {
        case 1: return 'light-blue lighten-3'
        default: return 'grey lighten-2'
      }
    }
  }
}
</script>

<style>

</style>
