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
    slug: string;
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

export const slugify = (str: string) => {
      return str
    .normalize("NFD")                     // sépare accents
    .replace(/[\u0300-\u036f]/g, "")      // enlève accents
    .toLowerCase()
    .replaceAll("/", "-")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")                  // évite double --
    .replace(/^-|-$/g, "");               // trim - début/fin
}

export const slugifyWithFolder = (folder: string, name: string): string => {
    return slugify(`${folder}/${name}`);
}

export const slugifyFromMarkdownWikilink = (str: string) => {
    const target = str.split("|")[0];
    return slugify(target)
}

export const findJikanCharacterById = (characters: MarkdownVaultFile[], id: number): MarkdownVaultFile | undefined => {
    return characters.find(character => character.data["ID Jikan"] == id);
}