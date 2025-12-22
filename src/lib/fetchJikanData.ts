import type { JikanAPICharacter } from "../types/JikanAPI/JikanAPICharacter";
import type { JikanAPICharacterResponse } from "../types/JikanAPI/JikanApiCharacterResponse";

export const fetchJikanData = async (animeId: string): Promise<JikanAPICharacter[]> => {
    const characterList: JikanAPICharacterResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`).then(res => res.json());
    return characterList.data.map(character => ({
        id: character.character.mal_id,
        nameEn: character.character.name,
        sprite: character.character.images?.webp?.image_url || character.character.images?.jpg?.image_url || ""
    }));
}
