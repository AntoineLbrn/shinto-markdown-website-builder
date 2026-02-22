export const DIRECT_IMAGE_REGEX_LINK = /!\[\[([^\]]+)\]\]/g
export const RESOURCE_LINK_REGEX = /\[\[([^\]]+)\]\]/g 
export const IMAGE_KEY = "image";

export const filenameToImageFileUrl = (filename: string) => {
    console.log("Converting filename to image URL:", filename);
    return `/img/${filename}`;
}

export const imageLinkedToImageFileUrl = (link: string) => {
    return link.replace(RESOURCE_LINK_REGEX, (match, p1) => {
            return filenameToImageFileUrl(p1);
    });
}

export const wikiLinkToFilename = (link: string) => {
    return link.replace(RESOURCE_LINK_REGEX, (match, p1) => {
        return p1;
    }).split("|")[0].split("/").pop() || link;
}