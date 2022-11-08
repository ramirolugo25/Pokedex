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

export function agregarPokemon(datosPokemon) {
  const {
    sprites: { front_default: foto },
    id,
    name: nombre,
  } = datosPokemon;
  const imagenPokemon = document.createElement('img');

  if (foto === null) {
    imagenPokemon.src = 'imagenes/bola-pokemon.png';
  } else {
    imagenPokemon.src = foto;
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
    sprites: { other: { 'official-artwork': { front_default: imagen } } },
    id,
    name: nombre,
    height: altura,
    weight: peso,
  } = pokemon;

  if (imagen) {
    document.querySelector('#tarjeta-pokemon #imagen-pokemon').src = imagen;
  } else {
    document.querySelector('#tarjeta-pokemon #imagen-pokemon').src = 'imagenes/bola-pokemon.png';
  }

  document.querySelector('#tarjeta-pokemon #id').textContent = `Id: ${id}`;
  document.querySelector('#tarjeta-pokemon #name').textContent = `Name: ${nombre}`;
  document.querySelector('#tarjeta-pokemon #height').textContent = `Height: ${altura / 10} m`;
  document.querySelector('#tarjeta-pokemon #weight').textContent = `Weight: ${peso / 10} kg`;

  let type = '';
  pokemon.types.forEach((tipo) => {
    type += ` ${tipo.type.name} `;
  });

  document.querySelector('#tarjeta-pokemon #tipos').textContent = `Tipo: ${type}`;
  document.querySelector('#tarjeta-pokemon').className = 'tarjeta-pokemon';
  bloquearInput();
}

export function mostrarContenedorCargando() {
  document.querySelector('#carga').className = 'carga';
}

export function ocultarContenedorCargando() {
  document.querySelector('#carga').className = 'oculto';
}
