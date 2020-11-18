<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 class="title">Clientes</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <clientes-table/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClientesTable from '@/components/tables/ClientesTable'

export default {
  name: 'Clientes',
  components: {
    ClientesTable
  }
}
</script>

<style>

</style>
