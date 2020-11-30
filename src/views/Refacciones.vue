<template>
  <div class="px-4">
    <v-row>
      <v-col>
        <refacciones-table/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RefaccionesTable from '@/modules/refacciones/RefaccionesTable'

export default {
  name: 'Refacciones',
  components: {
    RefaccionesTable
  }
}
</script>
