import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { MarkdownVaultFile } from "./astroDataStore";

export const fetchVaultSubfolder = async (folder: string): Promise<MarkdownVaultFile[]> => {
    const dir = path.join(process.cwd(), "vault", folder);
    const files = await fs.readdir(dir);
    const mdFiles = files.filter(f => f.endsWith(".md"));
    const results = await Promise.all(
        mdFiles.map(async (filename) => {
            const content = await fs.readFile(path.join(dir, filename), "utf-8");
            return { name: path.parse(filename).name, content, data: matter(content).data };
        })
    );
    return results;
};