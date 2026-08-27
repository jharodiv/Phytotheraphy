import { PlantCacheModel, PlantModel } from "@models/firestore.models";


export type UsePlantsReturn = {
    loading: boolean;
    error: string | null;
    handleFetchFeaturedPlant: () => Promise<PlantFeatured[]>;
    handleGetPlant: (scientificName: string) => Promise<PlantModel | PlantCacheModel | null>;
}

export type PlantFeatured = {
    id: string;
    commonName: string;
    scientificName: string;
};

export interface PlantCardsProps {
    onPlantPress: (
        plant: PlantFeatured
    ) => Promise<void>;
}

export type PlantDetailsProps = {
    family: string;
    description: string;

    medicinalProperties: string[];

    uses: string;
    preparationMethod: string;
    origin: string;
    sideEffect: string;
    verified: boolean;
}

export type PlantImageProps = {
    imageUrl: string;
    commonName: string;
    scientificName: string;
}

export type ResultViewProps = {
    plantDetails: PlantDetailsProps;
    plantImage: PlantImageProps;
}