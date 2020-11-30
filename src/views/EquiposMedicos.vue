<template>
  <div class="px-4">
    <v-row>
      <v-col>
        <equipos-medicos-table/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import EquiposMedicosTable from '@/modules/equiposMedicos/EquiposMedicosTable'

export default {
  name: 'Refacciones',
  components: {
    EquiposMedicosTable
  }
}
</script>
