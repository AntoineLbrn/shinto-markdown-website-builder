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
        onePieceItems: await fetchVaultSubfolder("One piece"),
        resources: await fetchVaultSubfolder(""),
    }
  };

  return store;
}

export interface MarkdownVaultFile {
    name: string;
    content: string;
    data: any;
    folder: string;
}

export interface Store {
    pokemons: PokemonAPIPokemonParsed[];
    onePiece: JikanAPICharacter[];
    naruto: JikanAPICharacter[];
    vault: {
        pokemons: MarkdownVaultFile[];
        narutoItems: MarkdownVaultFile[];
        onePieceItems: MarkdownVaultFile[];
        resources: MarkdownVaultFile[];
    };
}

export const getStoreApiItemSlug = (item: BaseApiItem | undefined) => {
    return item ? slugify(item.nameEn) : '';
}

export const getStoreVaultItemSlug = (item: MarkdownVaultFile) => {
    return slugify(item.name);
}

export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

export const findJikanCharacterById = (characters: MarkdownVaultFile[], id: number): MarkdownVaultFile | undefined => {
    return characters.find(character => character.data["ID Jikan"] == id);
}