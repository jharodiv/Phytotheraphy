import { identifyPlant } from "@services/ai/gemini.service";

import {
    getOrCreatePlant,
} from "@services/plants/plant-cache/plant-cache.service";

export interface ScanPlantResult {
    plant: Awaited<
        ReturnType<typeof getOrCreatePlant>
    >;
}

export async function scanPlant(
    imageBase64: string
): Promise<ScanPlantResult> {

    // Identify the plant using Gemini
    const identifiedPlant =
        await identifyPlant(
            imageBase64
        );

    if ("error" in identifiedPlant) {
        throw new Error(
            identifiedPlant.error
        );
    }

    // Resolve plant:
    // plants → plant_cache → create cache
    const plant =
        await getOrCreatePlant(
            identifiedPlant
        );

    return {
        plant,
    };
}