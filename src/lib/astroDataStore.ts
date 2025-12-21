import type { PokemonAPIPokemonParsed } from '../types/PokemonAPI/PokemonAPIPokemonParsed';
import { fetchPokemonsData } from './fetchPokemonsData';

let store: Store | null = null;

export async function getAstroStore() {
  if (store) return store;

  const pokemons = await fetchPokemonsData();
  store = {
    pokemons: pokemons,
  };

  return store;
}

export interface Store {
    pokemons: PokemonAPIPokemonParsed[];
}

export const getPokemonSlug = (pokemon: PokemonAPIPokemonParsed) => {
    return pokemon.nameEn;
}