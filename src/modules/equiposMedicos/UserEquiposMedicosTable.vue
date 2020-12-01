<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      sort-by="nombre"
    >
      <template v-if="isAdmin" #item.id="{ item }">
        <div class="d-flex align-center justify-end h-100">
          <v-btn
            text
            x-small
            color="primary"
          >
            editar {{ item.id }}
          </v-btn>
          <v-btn
            text
            x-small
            color="red"
          >
            eliminar
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EquiposMedicosTable',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // items: [],
      search: '',
      initialHeaders: [
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
          text: '',
          value: 'id',
          sortable: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'auth/isAdmin'
    }),
    headers () {
      return this.isAdmin ? this.initialHeaders : this.initialHeaders.filter(row => row.value !== 'id')
    }
  }
}
</script>
