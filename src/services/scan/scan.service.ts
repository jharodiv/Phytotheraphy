import { identifyPlant } from "@services/ai/gemini.service";
import {
    getOrCreatePlant,
    saveCachedPlant
} from "@services/plants/plant-cache/plant-cache.service";
import { ScanPlantResult } from "@type/plants.type";

export async function scanPlant(
    imageBase64: string
): Promise<ScanPlantResult> {

    // 1. Identify plant using Gemini
    const identifiedPlant =
        await identifyPlant(
            imageBase64
        );

    if ("error" in identifiedPlant) {
        throw new Error(
            identifiedPlant.error
        );
    }

    // 2. Check official plants and cache
    const plant =
        await getOrCreatePlant(
            identifiedPlant.scientificName
        );

    if (plant) {
        return {
            plant,
        };
    }

    // 3. Nothing exists, so save the
    //    already-generated Gemini result
    const cachedPlant =
        await saveCachedPlant(
            identifiedPlant
        );

    return {
        plant: cachedPlant,
    };
}