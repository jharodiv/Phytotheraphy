export type UsePlantsReturn = {
    loading: boolean;
    error: string | null;
    handleFetchFeaturedPlant: () => Promise<PlantFeatured[]>;
}


export type PlantFeatured = {
    id: string;
    commonName: string;
    scientificName: string;
};