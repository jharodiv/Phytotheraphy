import { usePlants } from "@hooks/plants/usePlants";
import { PlantFeatured } from "@type/plants.type";
import { useRouter } from "expo-router";

export function useNavigationPlant() {
    const router = useRouter();

    const {
        handleGetPlant,
    } = usePlants();

    const handlePlantPress = async (
        plant: PlantFeatured
    ) => {
        const result = await handleGetPlant(
            plant.scientificName
        );

        if (!result) {
            console.log(
                "No plant details available"
            );

            return;
        }

        router.push({
            pathname: "/(scan)/result",
            params: {
                imageUrl: result.imageUrl,
                commonName: result.commonName,
                scientificName: result.scientificName,

                family: result.family,
                description: result.description,

                medicinalProperties:
                    JSON.stringify(
                        result.medicinalProperties
                    ),

                uses: result.uses,
                preparationMethod:
                    result.preparationMethod,

                origin: result.origin,
                sideEffect: result.sideEffect,

                verified: String(
                    result.verified
                ),
            },
        });
    };

    return {
        handlePlantPress,
    };
}