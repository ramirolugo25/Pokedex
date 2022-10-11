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

export function obetenerPokemonAPI(nombreID) {
  const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';
  return fetch(`${URL_BASE}${nombreID}`)
    .then((respuesta) => {
      if (respuesta.ok && nombreID !== '') {
        return respuesta.json();
      }
      return 'Pokemon no encontrado';
    });
}
