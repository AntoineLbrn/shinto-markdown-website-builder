import type { genderPropertyValues } from '../consts';
import type { BaseApiItem } from '../types/BaseApiItem';
import type { JikanAPICharacter } from '../types/JikanAPI/JikanAPICharacter';
import type { PokemonAPIPokemonParsed } from '../types/PokemonAPI/PokemonAPIPokemonParsed';
import { fetchJikanData } from './fetchJikanData';
import { fetchPokemonsData } from './fetchPokemonsData';
import { fetchVaultSubfolder } from './fetchVaultSubfolder';
import { filenameToImageFileUrl, RESOURCE_LINK_REGEX, wikiLinkToFilename } from './filenameHelper';

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

  generateStoreBacklinks(store);

  return store;
}

const generateStoreBacklinks = (store: Store) => {
    store.vault.resources.forEach(resource => {
        const matches = [
            ...resource.content.matchAll(RESOURCE_LINK_REGEX).map(match => ({property: "content", match})),
            ...Object.entries(resource.data).map(([key, value]) => {
                if (typeof value === "string") {
                    return [...value.matchAll(RESOURCE_LINK_REGEX).map(match => ({property: key, match}))];
                } else if (Array.isArray(value)) {
                    // Si c'est un tableau, on cherche les liens dans chaque élément string
                    return value.flatMap(v =>
                        typeof v === "string"
                            ? [...v.matchAll(RESOURCE_LINK_REGEX).map(match => ({property: key, match}))]
                            : []
                    );
                }
                return [];
            }).flat()
        ];
        for (const match of matches) {
            const p1 = match.match[1];
            let linkedResource;
            if (p1.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) {
                linkedResource = store.vault.resources.find(
                    r => r.slug === filenameToImageFileUrl(wikiLinkToFilename(p1))
                );
            } else {
                linkedResource = store.vault.resources.find(
                    r => r.slug === slugifyFromMarkdownWikilink(p1)
                );
            }
            if (linkedResource && linkedResource.backlinks.every(b => b.slug !== resource.slug)) {
                linkedResource.backlinks.push({ name: resource.name, slug: resource.slug, property: match.property });
            }
        }
    });
}

export interface Backlink {
    property: string;
    name: string;
    slug: string;
}

export interface MarkdownVaultFile {
    name: string;
    content: string;
    data: { 
        [key: string]: any 
    };
    folder: string;
    slug: string;
    backlinks: Backlink[];
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