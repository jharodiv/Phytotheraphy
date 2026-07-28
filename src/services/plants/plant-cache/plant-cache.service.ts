import {
    doc,
    getDoc,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";

import { PlantCacheModel } from "@models/firestore.models";
import { PlantInformation } from "@models/plant-information.model";
import { generatePlantInformation } from "@services/ai/gemini-plant.service";
import { getPlantCacheId } from "utils/plant-cache/plant-cache.utils";
import { db } from '../../../../firebaseConfig';

const PLANT_CACHE = "plant_cache";

// READS if the plant is already cached

export async function getCachedPlant(
    scientificName: string
): Promise<PlantCacheModel | null> {
    const id = getPlantCacheId(scientificName);

    const snapshot = await getDoc(
        doc(db, PLANT_CACHE, id)
    );

    if (!snapshot.exists()){
        return null;
    }

    return snapshot.data() as PlantCacheModel;
} 

// WRITE if the plant is not yet cached

export async function saveCachedPlant(
    plant: PlantInformation
) : Promise<void> {
    const now = Timestamp.now();

    const cache: PlantCacheModel = {
        ...plant,
        generatedAt: now,
        lastAccessedAt: now,
        expiresAt: Timestamp.fromMillis(
            now.toMillis() + 180 * 24 * 60 * 60 * 1000 // 180 days
        ),
    };

    const id = getPlantCacheId(cache.scientificName);

    await setDoc(
        doc(db, PLANT_CACHE, id),
        cache
    );
}

// Update if the lastAccessed timestamp whenever a chached plant is viewed

export async function updateLastAccessed(
    scientificName: string
): Promise <void> {
    const id = getPlantCacheId(scientificName)

    await updateDoc(
        doc(db, PLANT_CACHE, id),{
            lastAccessedAt: Timestamp.now(),
        }
    )
}

/*
Look for the plant in Firestore.
If found:
Update lastAccessed in the background.
Return the cached plant.
If not found:
Call Gemini.
Save the result to Firestore.
Return the generated plant.
*/

export async function getPlant(
    scientificName: string,
): Promise <PlantCacheModel>{
    
    const cachedPlant = await getCachedPlant(scientificName);

    if (cachedPlant){
        updateLastAccessed(scientificName)
            .catch(console.error);

        return cachedPlant;
    }

    const result = await generatePlantInformation(scientificName)

    if("error" in result) {
        throw new Error(result.error)
    }

    await saveCachedPlant(result)

    /*
    Instead of returning result, the function reads the document from Firestore again.

    Why?

    Because the Firestore document now contains the complete cached model, including fields like:

    generatedAt
    lastAccessedAt
    expiresAt
    model

    Those fields may have been added when saving.

    So the cache becomes the single source of truth. */

    const savePlant = await getCachedPlant(scientificName)

    if(!savePlant){
        throw new Error("Failed to retrieve saved plant from cache")
    }

    return savePlant
}