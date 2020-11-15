<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 class="title">Refacciones</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <refacciones-table/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RefaccionesTable from '@/components/tables/RefaccionesTable'

export default {
  name: 'Refacciones',
  components: {
    RefaccionesTable
  }
}
</script>
