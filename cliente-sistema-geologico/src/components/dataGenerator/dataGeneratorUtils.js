import { faker } from '@faker-js/faker/locale/es';
import {
  especiesFosiles,
  periodos,
  tiposRoca,
  litologias,
  paises
} from './dataList';

export const generarFosil = () => {
  const paisSeleccionado = faker.helpers.arrayElement(paises);
  const provinciaSeleccionada = faker.helpers.arrayElement(paisSeleccionado.provincias);
  const especie = faker.helpers.arrayElement(especiesFosiles);
  const tieneLamina = faker.datatype.boolean();
  
  return {
    especie: especie,
    periodo: faker.helpers.arrayElement(periodos),
    nombre: `Fósil de ${especie}`,
    edad: faker.number.int({ min: 1000000, max: 350000000 }),
    donante: faker.person.fullName(),
    codigo: `FS-${faker.string.alphanumeric(6).toUpperCase()}`,
    ejemplares: faker.number.int({ min: 1, max: 5 }),
    documentosRelacionados: faker.helpers.maybe(() => `Documento ${faker.string.alphanumeric(8)}`, { probability: 0.7 }),
    laminaURL: tieneLamina ? 
      `https://storage.geologia.edu/laminas/${faker.string.uuid()}.jpg` : 
      "",
    laminaExiste: tieneLamina,
    latitud: faker.location.latitude({ min: -90, max: 90, precision: 4 }).toString(),
    longitud: faker.location.longitude({ min: -180, max: 180, precision: 4 }).toString(),
    localidad: faker.location.city(),
    leyenda: faker.lorem.words(2),
    nombreProvincia: provinciaSeleccionada,
    nombrePais: paisSeleccionado.nombre,
  };
};

export const generarRoca = () => {
  const paisSeleccionado = faker.helpers.arrayElement(paises);
  const provinciaSeleccionada = faker.helpers.arrayElement(paisSeleccionado.provincias);
  const litologia = faker.helpers.arrayElement(litologias);
  const tieneLamina = faker.datatype.boolean();
  
  return {
    tipoRoca: faker.helpers.arrayElement(tiposRoca),
    litologia: litologia,
    nombre: `Muestra de ${litologia}`,
    edad: faker.number.int({ min: 1000000, max: 4500000000 }),
    donante: faker.person.fullName(),
    codigo: `RC-${faker.string.alphanumeric(6).toUpperCase()}`,
    ejemplares: faker.number.int({ min: 1, max: 10 }),
    documentosRelacionados: faker.helpers.maybe(() => `Documento ${faker.string.alphanumeric(8)}`, { probability: 0.7 }),
    laminaURL: tieneLamina ? 
      `https://storage.geologia.edu/laminas/${faker.string.uuid()}.jpg` : 
      "",
    laminaExiste: tieneLamina,
    latitud: faker.location.latitude({ min: -90, max: 90, precision: 4 }).toString(),
    longitud: faker.location.longitude({ min: -180, max: 180, precision: 4 }).toString(),
    localidad: faker.location.city(),
    leyenda: faker.lorem.words(2),
    nombreProvincia: provinciaSeleccionada,
    nombrePais: paisSeleccionado.nombre,
  };
};