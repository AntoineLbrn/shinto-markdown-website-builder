export interface PokemonAPIPokemonSpecies {
    color: {
        name: string;
    }
    names: Array<{
        name: string;
        language: {
            name: string;
        };
    }>;
}