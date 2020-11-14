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
          color="purple"
          @click="$refs.userForm.add()"
          class="d-none d-md-block"
        >
          Nuevo
        </v-btn>
        <v-btn
          dark
          fab
          small
          color="purple"
          @click="$refs.lugarForm.add()"
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
      class="elevation-2"
    >
      <template #item.rol.nombre="{ item }">
        <v-chip label small :color="getRolColor(item.rol_id)">{{ item.rol.nombre }}</v-chip>
      </template>
      <template #item.estatus="{ item }">
        <v-chip label small :color="item.estatus ? 'success' : 'disabled'">
          {{ getStatusText(item.estatus) }}
        </v-chip>
      </template>
      <template #item.id="{ item }">
        <v-btn
          text
          x-small
          color="primary"
          @click="$refs.userForm.edit(item.id)"
        >editar</v-btn>
      </template>
    </v-data-table>
    <user-form ref="userForm" :roles="roles" @reloadUsers="fetch"/>
  </div>
</template>

<script>
import api from '@/api'
import UserForm from '@/components/modals/UserFormModal'

export default {
  name: 'UsuariosTable',
  components: {
    UserForm
  },
  data () {
    return {
      usuarios: [],
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
  methods: {
    async fetch () {
      this.loading = true
      try {
        const users = await api.get('/users')
        const roles = await api.get('/roles')
        this.usuarios = users.data
        this.roles = roles.data
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    getRolColor (id) {
      switch (id) {
        case 1: return 'light-blue lighten-3'
        default: return 'grey lighten-2'
      }
    },
    getStatusText (estatus) {
      return estatus ? 'Activo' : 'Inactivo'
    }
  }
}
</script>

<style>

</style>
