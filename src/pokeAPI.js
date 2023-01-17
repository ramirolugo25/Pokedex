export function obtenerPokemonesAPI(numeroPagina) {
  const offset = (numeroPagina - 1) * 20;
  return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
    .then((respuestaPokemones) => respuestaPokemones.json())
    .then((respuestaPokemonesJSON) => respuestaPokemonesJSON.results);
}

export function obtenerCantidadDePokemonesAPI() {
  return fetch('https://pokeapi.co/api/v2/pokemon/')
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => respuestaJSON.count);
}

export function obtenerPokemonAPI(nombreId) {
  const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';
  return fetch(`${URL_BASE}${nombreId}`)
    .then((respuesta) => {
      if (respuesta.ok && nombreId !== '') {
        return respuesta.json();
      }
      return 'Pokemon no encontrado';
    });
}
