import { PlantCacheModel, PlantModel } from "@models/firestore.models";
import { PlantInformation } from "@models/plant-information.model";
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
            plantInformation: PlantInformation
        ): Promise<PlantModel | PlantCacheModel | null> => {
            try {
                setLoading(true);
                setError(null);

                const plant = await getOrCreatePlant(plantInformation);

                console.log("Handle Get Plant Result", plant);


                if (!plant) {
                    console.log(
                        "No plant detailed returned"
                    );
                }

                console.log("Plant details successfully retrieved");

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

    return {
        handleFetchFeaturedPlant,
        handleGetPlant,
        loading,
        error,
    }

}