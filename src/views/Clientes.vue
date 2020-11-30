<template>
  <div class="px-4">
    <v-row>
      <v-col>
        <clientes-table/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ClientesTable from '@/modules/clientes/ClientesTable'

export default {
  name: 'Clientes',
  components: {
    ClientesTable
  }
}
</script>

<style>

</style>
