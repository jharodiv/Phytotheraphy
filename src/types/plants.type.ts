import { PlantCacheModel, PlantModel } from "@models/firestore.models";


export type UsePlantsReturn = {
    loading: boolean;
    error: string | null;
    handleFetchFeaturedPlant: () => Promise<PlantFeatured[]>;
    handleGetPlant: (scientificName: string) => Promise<PlantModel | PlantCacheModel | null>;
    handlePlantPress: (plant: PlantFeatured) => Promise<PlantModel | PlantCacheModel | null>;
}


export type PlantFeatured = {
    id: string;
    commonName: string;
    scientificName: string;
};

export interface PlantCardsProps {
    onPlantPress: (
        plant: PlantFeatured
    ) => Promise<
        PlantModel |
        PlantCacheModel |
        null
    >;
}