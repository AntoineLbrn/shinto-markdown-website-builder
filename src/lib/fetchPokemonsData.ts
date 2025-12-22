import type { PokemonAPIDetailledPokemon } from "../types/PokemonAPI/PokemonAPIDetailledPokemonList";
import type { PokemonAPIPokemonList } from "../types/PokemonAPI/PokemonAPIPokemonList";
import type { PokemonAPIPokemonParsed } from "../types/PokemonAPI/PokemonAPIPokemonParsed";
import type { PokemonAPIPokemonSpecies } from "../types/PokemonAPI/PokemonAPIPokemonSpecies";

export const fetchPokemonsData = async (): Promise<PokemonAPIPokemonParsed[]> => {
    const pokemonApiList: PokemonAPIPokemonList = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=2000").then(res => res.json());
    const pokemonList: PokemonAPIPokemonParsed[] = [];
    for (const pokemon of pokemonApiList.results.slice(0, 26)) {
        const detailledPokemon: PokemonAPIDetailledPokemon = await fetch(pokemon.url).then(res => res.json());
        const pokemonSpecies: PokemonAPIPokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`).then(res => res.json());
        pokemonList.push({
            nameEn: pokemon.name,
            nameFr: pokemonSpecies.names.find(name => name.language.name === 'fr')?.name || null,
            nameJa: pokemonSpecies.names.find(name => name.language.name === 'ja')?.name || null,
            sprite: detailledPokemon.sprites.front_default,
            color: pokemonSpecies.color.name,
            id: detailledPokemon.id
        });
    }
    return pokemonList;
}