export interface JikanAPICharacterResponse {
    data: Array<{
        character: {
            mal_id: number
            name: string
            images?: {
                jpg?: {
                    image_url: string
                }
                webp?: {
                    image_url: string
                }
            }
        };

    }>
}