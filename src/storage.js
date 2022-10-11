import {
  obtenerPokemonesAPI,
  obtenerCantidadDePokemonesAPI,
  obetenerPokemonAPI,
} from './pokeAPI.js';

function guardarPokemones(numeroPagina, pokemones) {
  localStorage.setItem(numeroPagina, JSON.stringify(pokemones));
}

export async function obtenerPokemones(numeroPagina) {
  let pokemones = JSON.parse(localStorage.getItem(numeroPagina));

  if (pokemones === null) {
    pokemones = await obtenerPokemonesAPI(numeroPagina);

    try {
      guardarPokemones(numeroPagina, pokemones);
    } catch (e) {
      console.error(e);
    }
  }
  return pokemones;
}

function guardadCantidadPokemones(cantidadPokemones) {
  localStorage.setItem('cantidadPokemones', JSON.stringify(cantidadPokemones));
}

export async function obtenerCantidadDePokemones() {
  let cantidadPokemones = JSON.parse(localStorage.getItem('cantidadPokemones'));

  if (cantidadPokemones === null) {
    cantidadPokemones = await obtenerCantidadDePokemonesAPI();

    try {
      guardadCantidadPokemones(cantidadPokemones);
    } catch (e) {
      console.error(e);
    }
  }

  return cantidadPokemones;
}

function guardarPokemon(nombreID, pokemon) {
  const pokemonJSON = {};
  pokemonJSON.height = pokemon.height;
  pokemonJSON.id = pokemon.id;
  pokemonJSON.name = pokemon.name;
  pokemonJSON.sprites = pokemon.sprites;
  pokemonJSON.types = pokemon.types;
  pokemonJSON.weight = pokemon.weight;

  localStorage.setItem(nombreID, JSON.stringify(pokemonJSON));
}

export async function obtenerPokemon(nombreID) {
  let pokemon = JSON.parse(localStorage.getItem(nombreID));

  if (pokemon === null) {
    pokemon = await obetenerPokemonAPI(nombreID);

    try {
      guardarPokemon(nombreID, pokemon);
    } catch (e) {
      console.error(e);
    }
  }

  return pokemon;
}
