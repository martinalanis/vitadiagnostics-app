<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 class="title">Equipos Médicos</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <equipos-medicos-table/>
      </v-col>
    </v-row>
  </v-container>
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
