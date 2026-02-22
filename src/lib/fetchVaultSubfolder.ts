import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { slugifyWithFolder, type MarkdownVaultFile } from "./astroDataStore";

const vaultFolderName: string = "vault";

async function getMarkdownFilesRecursively(dir: string): Promise<MarkdownVaultFile[]> {
    let results: MarkdownVaultFile[] = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(await getMarkdownFilesRecursively(fullPath));
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
            const content = await fs.readFile(fullPath, "utf-8");
            results.push({
                name: path.parse(entry.name).name,
                content: matter(content).content,
                folder: path.dirname(fullPath).split(vaultFolderName)[1].replace(/^\/|\\/, ""),
                data: matter(content).data,
                slug: slugifyWithFolder(
                    path.dirname(fullPath).split(vaultFolderName)[1].replace(/^\/|\\/, ""),
                    path.parse(entry.name).name,
                )
            });
        }
    }
    return results;
}

export const fetchVaultSubfolder = async (folder: string): Promise<MarkdownVaultFile[]> => {
    const dir = path.join(process.cwd(), vaultFolderName, folder);
    return getMarkdownFilesRecursively(dir);
};