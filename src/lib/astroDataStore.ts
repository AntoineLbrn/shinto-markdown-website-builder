import type { PokemonAPIPokemonParsed } from '../types/PokemonAPI/PokemonAPIPokemonParsed';
import { fetchPokemonsData } from './fetchPokemonsData';
import { fetchVaultPokemons } from './fetchVaultPokemons';

let store: Store | null = null;

export async function getAstroStore() {
  if (store) return store;

  const pokemons = await fetchPokemonsData();
  const pokemonsFromVault = await fetchVaultPokemons();
  store = {
    pokemons: pokemons,
    vault: {
        pokemons: pokemonsFromVault
    }
  };

  return store;
}

export interface MarkdownVaultFile {
    name: string;
    content: string;
}

export interface Store {
    pokemons: PokemonAPIPokemonParsed[];
    vault: {
        pokemons: MarkdownVaultFile[];
    };
}

export const getPokemonSlug = (pokemon: PokemonAPIPokemonParsed) => {
    return pokemon.nameEn;
}