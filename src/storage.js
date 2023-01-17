import {
  obtenerPokemonesAPI,
  obtenerCantidadDePokemonesAPI,
  obtenerPokemonAPI,
} from './pokeAPI.js';
import { Pokemon } from './Pokemon.js';

function guardarPokemones(numeroPagina, pokemones) {
  localStorage.setItem(`pagina-${numeroPagina}`, JSON.stringify(pokemones));
}

export async function obtenerPokemones(numeroPagina) {
  let pokemones = JSON.parse(localStorage.getItem(`pagina-${numeroPagina}`));

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

function guardarPokemon(pokemon) {
  localStorage.setItem(pokemon.name, JSON.stringify(pokemon));
}

export async function obtenerPokemon(nombreId) {
  let pokemonJSON = JSON.parse(localStorage.getItem(nombreId));
  

  

  if (pokemonJSON === null) {
    try {
      const datosPokemon = await obtenerPokemonAPI(nombreId);
      if(datosPokemon === 'Pokemon no encontrado'){
        return datosPokemon;
      }
      const {id, name, height, weight, types, sprites} = datosPokemon;
      const pokemon =  new Pokemon(id, name, height, weight, types, sprites); 
      guardarPokemon(pokemon);
      return pokemon;
    } catch (e) {
      console.error(e);
    } 
  } else{
    let pokemon = new Pokemon(pokemonJSON.id, pokemonJSON.name, pokemonJSON.height, pokemonJSON.weight, pokemonJSON.types, pokemonJSON.sprites);
    return pokemon;
  }

}
