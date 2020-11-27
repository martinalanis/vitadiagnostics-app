<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      sort-by="nombre"
    >
      <template #item.id="{ item }">
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
          text: '',
          value: 'id',
          sortable: false
        }
      ]
    }
  }
}
</script>
