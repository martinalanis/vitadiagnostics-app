<template>
  <v-row>
    <v-col cols="12" md="6">
      <h4 class="mb-4 text--secondary border-bottom pb-1">GENERALES</h4>
      <p>
        <small class="text--secondary">NOMBRE</small><br>
        {{ item.nombre }}
      </p>
      <p>
        <small class="text--secondary">RAZÓN SOCIAL</small><br>
        {{ item.razon_social }}
      </p>
      <p>
        <small class="text--secondary">RFC</small><br>
        {{ item.rfc }}
      </p>
      <div>
        <p class="d-inline-block mr-6">
          <small class="text--secondary">FECHA CREACIÓN</small><br>
          {{ item.createdAt }}
        </p>
        <p class="d-inline-block">
          <small class="text--secondary">ÚLTIMA MODIFICACIÓN</small><br>
          {{ item.lastModified }}
        </p>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <h4 class="mb-6 text--secondary border-bottom pb-1">CONTACTO</h4>
      <p>
        <small class="text--secondary">EMAIL</small><br>
        {{ item.email }}
      </p>
      <p>
        <small class="text--secondary">TELÉFONOS</small><br>
        {{ item.telefonos }}
      </p>
      <p>
        <small class="text--secondary">DIRECCIÓN</small><br>
        {{ item.direccion }}
      </p>
      <div>
        <p class="d-inline-block mr-6">
          <small class="text--secondary">CP</small><br>
          {{ item.cp || '--' }}
        </p>
        <p class="d-inline-block mr-6">
          <small class="text--secondary">ESTADO</small><br>
          {{ item.estado }}
        </p>
        <p class="d-inline-block">
          <small class="text--secondary">MUNICIPIO</small><br>
          {{ item.municipio }}
        </p>
      </div>
    </v-col>
    <v-col cols="12">
      <h4 class="text--secondary border-bottom pb-1 mb-6">EQUIPOS MEDICOS</h4>
      <equipos-medicos :items="item.equipos_medicos"/>
    </v-col>
  </v-row>
</template>

<script>
import EquiposMedicos from '@/modules/equiposMedicos/UserEquiposMedicosTable'
export default {
  name: 'ClientDetails',
  components: {
    EquiposMedicos
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.quote {
  position: relative;
  padding-left: 1em;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: rgb(2, 122, 170);
  }
}
p {
  line-height: 1.7;
  small {
    letter-spacing: 1px;
    font-weight: 600;
    font-size: 0.8em;
  }
}
.bb {
  border-bottom: 1px solid #000;
}
</style>
