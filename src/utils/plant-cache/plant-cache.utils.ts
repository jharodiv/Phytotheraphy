export function getPlantCacheId(scientificName: string): string {
    return scientificName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");
}