import fs from "fs/promises";
import path from "path";

export const fetchVaultPokemons = async (): Promise<{ name: string; content: string }[]> => {
    const dir = path.join(process.cwd(), "vault/Pokemon");
    const files = await fs.readdir(dir);
    const mdFiles = files.filter(f => f.endsWith(".md"));
    const results = await Promise.all(
        mdFiles.map(async (filename) => {
            const content = await fs.readFile(path.join(dir, filename), "utf-8");
            return { name: path.parse(filename).name, content };
        })
    );
    return results;
};