import type { BaseApiItem } from '../types/BaseApiItem';
import type { JikanAPICharacter } from '../types/JikanAPI/JikanAPICharacter';
import type { PokemonAPIPokemonParsed } from '../types/PokemonAPI/PokemonAPIPokemonParsed';
import { fetchJikanData } from './fetchJikanData';
import { fetchPokemonsData } from './fetchPokemonsData';
import { fetchVaultSubfolder } from './fetchVaultSubfolder';

let store: Store | null = null;

export async function getAstroStore() {
  if (store) return store;

  const pokemons = await fetchPokemonsData();
  const onePiece = await fetchJikanData("21");
  const naruto = await fetchJikanData("20");

  store = {
    pokemons: pokemons,
    onePiece: onePiece,
    naruto: naruto,
    vault: {
        pokemons: await fetchVaultSubfolder("Pokemon"),
        narutoItems: await fetchVaultSubfolder("Naruto"),
        onePieceItems: await fetchVaultSubfolder("One piece")
    }
  };

  return store;
}

export interface MarkdownVaultFile {
    name: string;
    content: string;
    data: any;
}

export interface Store {
    pokemons: PokemonAPIPokemonParsed[];
    onePiece: JikanAPICharacter[];
    naruto: JikanAPICharacter[];
    vault: {
        pokemons: MarkdownVaultFile[];
        narutoItems: MarkdownVaultFile[];
        onePieceItems: MarkdownVaultFile[];
    };
}

export const getStoreItemSlug = (item: BaseApiItem) => {
    return item.nameEn;
}

export const findJikanCharacterById = (characters: MarkdownVaultFile[], id: number): MarkdownVaultFile | undefined => {
    return characters.find(character => character.data["ID Jikan"] == id);
}