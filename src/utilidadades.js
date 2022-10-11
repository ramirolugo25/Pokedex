import {
  mostrarContenedorCargando,
  borrarPokemones,
  agregarClasesNombresPokemones,
  agregarPokemon,
  ocultarContenedorCargando,
  cargarBotonPosterior,
  desabilitarPrimeraPagina,
  cargarPokemonTarjeta,
} from './ui.js';

import {
  obtenerPokemones,
  obtenerPokemon,
  obtenerCantidadDePokemones,
} from './storage.js';

async function manejarInputPokemon() {
  mostrarContenedorCargando();
  const nombrePokemon = this.classList[0];
  const pokemon = await obtenerPokemon(nombrePokemon);
  cargarPokemonTarjeta(pokemon);

  ocultarContenedorCargando();
}

function inicializarInputsPokemones() {
  document.querySelectorAll('#contenedor-pokemones div').forEach(($pokemon) => {
    $pokemon.onclick = manejarInputPokemon;
  });
}

export async function cargarPokemones(numeroPagina) {
  mostrarContenedorCargando();
  borrarPokemones();
  const pokemones = await obtenerPokemones(numeroPagina);
  agregarClasesNombresPokemones(pokemones);

  pokemones.forEach(async (pokemon) => {
    const datosPokemon = await obtenerPokemon(pokemon.name);
    agregarPokemon(datosPokemon);
  });

  inicializarInputsPokemones();
  ocultarContenedorCargando();
}

export async function cargarPaginacion() {
  const cantidadPokemones = await obtenerCantidadDePokemones();
  const cantidadPokemonesPorPagina = 20;
  const cantidadPaginas = Math.ceil(cantidadPokemones / cantidadPokemonesPorPagina);

  const $paginacion = document.querySelector('#paginacion');

  for (let i = 1; i <= cantidadPaginas; i += 1) {
    const $boton = document.createElement('button');
    $boton.id = `boton-${i}`;
    $boton.classList.add('boton-paginacion');
    $boton.innerText = i;
    $paginacion.appendChild($boton);
  }
  cargarBotonPosterior();
  desabilitarPrimeraPagina();
}

function manejarInputBotonesPaginacion(e) {
  const $boton = e.target;
  const idBoton = $boton.id;
  let numeroPaginaActual = Number(document.querySelector('.boton-paginacion[disabled]').textContent);
  const listaPaginacion = document.querySelectorAll('.boton-paginacion');
  const numeroUltimaPagina = Number(listaPaginacion[listaPaginacion.length - 1].textContent);

  if (idBoton === 'anterior') {
    document.querySelector(`#boton-${numeroPaginaActual}`).disabled = false;
    numeroPaginaActual -= 1;
    document.querySelector(`#boton-${numeroPaginaActual}`).disabled = true;
  } else if (idBoton === 'posterior') {
    document.querySelector(`#boton-${numeroPaginaActual}`).disabled = false;
    numeroPaginaActual += 1;
    document.querySelector(`#boton-${numeroPaginaActual}`).disabled = true;
  } else {
    const numeroBoton = $boton.textContent;
    document.querySelector(`#boton-${numeroPaginaActual}`).disabled = false;
    numeroPaginaActual = numeroBoton;
    document.querySelector(`#boton-${numeroPaginaActual}`).disabled = true;
  }

  if (numeroPaginaActual === 1) {
    document.querySelector('#anterior').disabled = true;
  } else {
    document.querySelector('#anterior').disabled = false;
  }
  if (numeroPaginaActual === numeroUltimaPagina) {
    document.querySelector('#posterior').disabled = true;
  } else {
    document.querySelector('#posterior').disabled = false;
  }

  cargarPokemones(numeroPaginaActual);
}

async function manejarInputBuscar() {
  mostrarContenedorCargando();
  document.querySelector('#error').className = 'oculto';
  const valorInput = document.querySelector('#busqueda input').value.toLowerCase();

  const respuestaPokemon = await obtenerPokemon(valorInput);

  if (respuestaPokemon === 'Pokemon no encontrado') {
    document.querySelector('#error').className = '';
  } else {
    document.querySelector('#error').className = 'oculto';
    cargarPokemonTarjeta(respuestaPokemon);
  }

  ocultarContenedorCargando();
}

function manejarInputCerrarTarjetaPokemon() {
  document.querySelector('#tarjeta-pokemon').className = 'oculto';
  document.querySelectorAll('.pokemon').forEach((pokemon) => {
    pokemon.onclick = manejarInputPokemon;
  });
  document.querySelectorAll('.boton-paginacion').forEach((boton) => {
    boton.onclick = manejarInputBotonesPaginacion;
  });
  document.querySelector('#anterior').onclick = manejarInputBotonesPaginacion;
  document.querySelector('#posterior').onclick = manejarInputBotonesPaginacion;
  document.querySelector('#busqueda input').disabled = false;
  document.querySelector('#boton-buscar').onclick = manejarInputBuscar;
}

export function inicializarInputs() {
  document.querySelector('#quit img').onclick = manejarInputCerrarTarjetaPokemon;
  document.querySelector('#boton-buscar').onclick = manejarInputBuscar;

  document.querySelectorAll('.boton-paginacion').forEach(($botonPaginacion) => {
    $botonPaginacion.onclick = manejarInputBotonesPaginacion;
  });

  document.querySelector('#anterior').onclick = manejarInputBotonesPaginacion;
  document.querySelector('#posterior').onclick = manejarInputBotonesPaginacion;
}
