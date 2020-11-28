<template>
  <div>
    <v-row class="align-center mb-2">
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
          agregar equipo médico
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
    <v-row class="align-end mb-8">
      <v-col cols="12" md="7">
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
      <v-col cols="12" md="4">
        <p class="subtitle-2 text--secondary mb-1">Agrupar por:</p>
        <v-select
          v-model="groupBy"
          placeholder="----"
          :items="optGroupBy"
          full-width
          hide-details
          clearable
          dense
          solo
        ></v-select>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="equiposMedicos"
      :loading="loading"
      :search="search"
      sort-by="id"
      sort-desc
      :group-by="groupBy"
      class="elevation-2"
    >
      <template v-slot:group.header="{items, groupBy, isOpen, toggle}">
        <th colspan="7">
          <v-icon @click="toggle" left>
            {{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
          </v-icon>
          <span v-if="groupBy[0] === 'cliente.nombre'">{{ items[0].cliente.nombre }}</span>
          <span v-else-if="groupBy[0] === 'modalidad'">{{ items[0].modalidad.nombre }}</span>
          <span v-else>{{ items[0].fabricante }}</span>
        </th>
      </template>
      <template #item.id="{ item }">
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
    <!-- <refacciones-form ref="refaccionesForm" @reloadTable="fetch"/> -->
    <confirm-single-modal ref="confirmModal" @confirm="remove"/>
  </div>
</template>

<script>
import api from '@/api'
// import RefaccionesForm from './RefaccionesFormModal'
import ConfirmSingleModal from '@/components/ui/ConfirmSingleModal'

export default {
  name: 'EquiposMedicosTable',
  components: {
    // RefaccionesForm,
    ConfirmSingleModal
  },
  data () {
    return {
      equiposMedicos: [],
      roles: [],
      groupBy: null,
      optGroupBy: [
        {
          text: 'Cliente',
          value: 'cliente.nombre'
        },
        {
          text: 'Modalidad',
          value: 'modalidad'
        },
        {
          text: 'Fabricante',
          value: 'fabricante'
        }
      ],
      headers: [
        {
          text: 'Nombre',
          value: 'nombre'
        },
        {
          text: 'Modelo',
          value: 'modelo'
        },
        {
          text: 'Serie',
          value: 'serie'
        },
        {
          text: 'Fabricante',
          value: 'fabricante'
        },
        {
          text: 'Modalidad',
          value: 'modalidad.tag'
        },
        {
          text: 'Cliente',
          value: 'cliente.nombre'
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
        const equiposMedicos = await api.get('/equipos-medicos')
        this.equiposMedicos = equiposMedicos.data
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    },
    async remove (id) {
      try {
        const res = await api.delete(`/equipos-medicos/${id}`)
        this.$store.dispatch('notify', { success: true, message: res.data })
        this.fetch()
      } catch (error) {
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    }
  }
}
</script>
