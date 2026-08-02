import { identifyPlant } from "@services/ai/gemini.service";
import { searchHerbImage } from "@services/unsplash.service";

import { getOrCreateCachedPlant } from "@services/plants/plant-cache/plant-cache.service";

export interface ScanPlantResult {
    plant: Awaited<ReturnType<typeof getOrCreateCachedPlant>>;
    imageUrl: string;
    photographerName: string;
    photographerUrl: string;
}

export async function scanPlant(
    imageBase64: string
): Promise<ScanPlantResult> {

    // Step 1: Identify the plant using Gemini
    const identifiedPlant = await identifyPlant(imageBase64);

    if ("error" in identifiedPlant) {
        throw new Error(identifiedPlant.error);
    }

    // Step 2: Check Firestore cache (creates one if it doesn't exist)
    const plant = await getOrCreateCachedPlant(
        identifiedPlant
    );

    // Step 3: Retrieve an image from Unsplash
    const unsplash = await searchHerbImage(
        plant.commonName
    );

    return {
        plant,

        imageUrl:
            unsplash?.imageUrl ?? "",

        photographerName:
            unsplash?.photographerName ?? "",

        photographerUrl:
            unsplash?.photographerUrl ?? "",
    };
}