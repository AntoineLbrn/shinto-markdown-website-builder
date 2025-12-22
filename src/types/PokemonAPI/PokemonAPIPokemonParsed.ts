import type { BaseApiItem } from "../BaseApiItem";

export interface PokemonAPIPokemonParsed extends BaseApiItem {
    nameFr: string | null;
    nameJa: string | null;
    color: string | null;
}