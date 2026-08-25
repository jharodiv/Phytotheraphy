import { fetchFeaturedPlant } from "@services/plants/plants.service";
import { PlantFeatured, UsePlantsReturn } from "@type/plants.type";
import { useCallback, useState } from "react";

export function usePlants(): UsePlantsReturn {

    const [loading, setLoading] = useState(true);
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

    return {
        handleFetchFeaturedPlant,
        loading,
        error,
    }

}