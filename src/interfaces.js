export const Client = () => {
  return {
    nombre: '',
    razon_social: '',
    email: '',
    telefonos: '',
    rfc: '',
    direccion: '',
    cp: '',
    estado: '',
    municipio: ''
  }
}

export const EquipoMedico = () => {
  return {
    cliente_id: '',
    nombre: '',
    modelo: '',
    serie: '',
    fabricante: '',
    modalidad_id: ''
  }
}

export const Refaccion = () => {
  return {
    nombre: '',
    modelo: '',
    serie: ''
  }
}

export const User = () => {
  return {
    nombre: '',
    telefono: '',
    email: '',
    rfc: '',
    direccion: '',
    cp: '',
    estado: '',
    municipio: '',
    rol_id: null,
    estatus: 1,
    password: ''
  }
}
