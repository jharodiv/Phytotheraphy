import { PlantCacheModel, PlantModel } from "@models/firestore.models";
import { getOrCreatePlant } from "@services/plants/plant-cache/plant-cache.service";
import { fetchFeaturedPlant } from "@services/plants/plants.service";
import { PlantFeatured, UsePlantsReturn } from "@type/plants.type";
import { useCallback, useState } from "react";

export function usePlants(): UsePlantsReturn {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchFeaturedPlant = useCallback(
        async (): Promise<PlantFeatured[]> => {
            try {
                setLoading(true);
                setError(null);

                const featuredPlants =
                    await fetchFeaturedPlant();

                return featuredPlants;
            } catch (error) {
                console.error(
                    "Failed to fetch featured plants",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to fetch featured plants"
                );

                return [];
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const handleGetPlant = useCallback(
        async (
            scientificName: string
        ): Promise<PlantModel | PlantCacheModel | null> => {
            try {
                setLoading(true);
                setError(null);

                const plant = await getOrCreatePlant(scientificName);

                return plant;

            } catch (error) {
                console.error(
                    "Failed to fetch the plant:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to retrieve plant information"
                );

                return null;

            } finally {
                setLoading(false);
            }
        },
        []
    );
    const handlePlantPress =
        useCallback(
            async (
                plant: PlantFeatured
            ): Promise<
                PlantModel |
                PlantCacheModel |
                null
            > => {
                setError(null);

                return await handleGetPlant(
                    plant.scientificName
                );
            },
            [handleGetPlant]
        );

    return {
        handleFetchFeaturedPlant,
        handleGetPlant,
        handlePlantPress,
        loading,
        error,
    }

}