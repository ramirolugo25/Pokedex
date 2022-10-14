import {
  cargarPokemones,
  cargarPaginacion,
  inicializarInputs,
} from './utilidadades.js';

const numeroPaginaActual = 1;

async function inicializar() {
  await cargarPokemones(numeroPaginaActual);
  await cargarPaginacion();
  inicializarInputs();
}

inicializar();
