<template>
  <div class="px-4">
    <v-row>
      <v-col>
        <cotizaciones-table/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CotizacionesTable from '@/modules/cotizaciones/CotizacionesTable'

export default {
  name: 'Cotizaciones',
  components: {
    CotizacionesTable
  }
}
</script>
