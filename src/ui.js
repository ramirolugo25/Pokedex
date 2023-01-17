// import { Pokemon } from "./Pokemon";



export function borrarPokemones() {
  document.querySelectorAll('.pokemon').forEach(($pokemon) => {
    $pokemon.remove();
  });
}

export function agregarClasesNombresPokemones(pokemones) {
  pokemones.forEach((pokemon) => {
    const { name: nombre } = pokemon;
    const $contenedorPokemon = document.createElement('div');
    $contenedorPokemon.classList.add(`${nombre}`);
    const $contenedorPokemones = document.querySelector('#contenedor-pokemones');
    $contenedorPokemones.appendChild($contenedorPokemon);
  });
}

export function agregarPokemon(pokemon) {
  const {
    id,
    name: nombre,
  } = pokemon;
  const imagenPokemon = document.createElement('img');

  if (pokemon.primeraImagen() === null) {
    imagenPokemon.src = 'imagenes/bola-pokemon.png';
  } else {
    imagenPokemon.src = pokemon.primeraImagen();
  }

  const $labelID = document.createElement('label');
  const textoID = document.createTextNode(id);
  $labelID.appendChild(textoID);

  const $labelNombre = document.createElement('label');
  const nombrePokemon = document.createTextNode(nombre);
  $labelNombre.appendChild(nombrePokemon);

  const $contenedorPokemon = document.querySelector(`.${nombre}`);
  $contenedorPokemon.classList.add('pokemon');
  $contenedorPokemon.appendChild(imagenPokemon);
  $contenedorPokemon.appendChild($labelID);
  $contenedorPokemon.appendChild($labelNombre);
}

export function cargarBotonPosterior() {
  const $paginacion = document.querySelector('#paginacion');
  const $boton = document.createElement('button');
  $boton.id = 'posterior';
  $boton.innerText = '»';
  $paginacion.appendChild($boton);
}

export function deshabilitarPrimeraPagina() {
  document.querySelector('#boton-1').disabled = true;
}

function bloquearInput() {
  document.querySelectorAll('.pokemon').forEach((pokemon) => {
    pokemon.onclick = () => {};
  });
  document.querySelectorAll('.boton-paginacion').forEach((boton) => {
    boton.onclick = () => {};
  });
  document.querySelector('#anterior').onclick = () => {};
  document.querySelector('#posterior').onclick = () => {};
  document.querySelector('#busqueda input').disabled = true;
  document.querySelector('#boton-buscar').onclick = () => {};
}

export function cargarPokemonTarjeta(pokemon) {
  const {
    id,
    name: nombre,
  } = pokemon;

  if (pokemon.segundaImagen()) {
    document.querySelector('#tarjeta-pokemon #imagen-pokemon').src = pokemon.segundaImagen();
  } else {
    document.querySelector('#tarjeta-pokemon #imagen-pokemon').src = 'imagenes/bola-pokemon.png';
  }

  document.querySelector('#tarjeta-pokemon #id').textContent = `Id: ${id}`;
  document.querySelector('#tarjeta-pokemon #name').textContent = `Name: ${nombre}`;
  document.querySelector('#tarjeta-pokemon #height').textContent = `Height: ${pokemon.altura()}`;
  document.querySelector('#tarjeta-pokemon #weight').textContent = `Weight: ${pokemon.peso()}`;
  document.querySelector('#tarjeta-pokemon #tipos').textContent = `Tipo: ${pokemon.tipos()}`;
  document.querySelector('#tarjeta-pokemon').className = 'tarjeta-pokemon';
  bloquearInput();
}

export function mostrarContenedorCargando() {
  document.querySelector('#carga').className = 'carga';
}

export function ocultarContenedorCargando() {
  document.querySelector('#carga').className = 'oculto';
}
