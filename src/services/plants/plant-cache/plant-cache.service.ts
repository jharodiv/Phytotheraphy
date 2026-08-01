import {
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";

import { db } from "../../../../firebaseConfig";

import { PlantCacheModel } from "@models/firestore.models";
import { PlantInformation } from "@models/plant-information.model";
import { getPlantCacheId } from "utils/plant-cache/plant-cache.utils";

const PLANT_CACHE = "plant_cache";

const CACHE_DURATION_DAYS = 180;
const DAYS_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Returns a cached plant if it exists and has not expired.
 */
export async function getCachedPlant(
    scientificName: string
): Promise<PlantCacheModel | null> {
    const id = getPlantCacheId(scientificName);

    const documentRef = doc(db, PLANT_CACHE, id);

    const snapshot = await getDoc(documentRef);

    if (!snapshot.exists()) {
        return null;
    }

    const cache = snapshot.data() as PlantCacheModel;

    // Remove expired cache
    if (cache.expiresAt.toMillis() <= Timestamp.now().toMillis()) {
        await deleteDoc(documentRef);
        return null;
    }

    return cache;
}

/**
 * Creates a new cache document.
 */
export async function saveCachedPlant(
    plant: PlantInformation
): Promise<void> {
    const now = Timestamp.now();

    const cache: PlantCacheModel = {
        ...plant,
        generatedAt: now,
        lastAccessedAt: now,
        expiresAt: Timestamp.fromMillis(
            now.toMillis() + CACHE_DURATION_DAYS * DAYS_IN_MS
        ),
    };

    const id = getPlantCacheId(plant.scientificName);

    await setDoc(
        doc(db, PLANT_CACHE, id),
        cache
    );
}

/**
 * Updates the last accessed timestamp.
 */

export async function updateLastAccessed(
    scientificName: string
): Promise<void> {
    const id = getPlantCacheId(scientificName);

    await updateDoc(
        doc(db, PLANT_CACHE, id),
        {
            lastAccessedAt: Timestamp.now(),
        }
    );
}

/**
 * Returns an existing cache if available.
 * Otherwise, creates one and returns it.
 */

export async function getOrCreateCachedPlant(
    plant: PlantInformation
): Promise<PlantCacheModel> {

    const cachedPlant = await getCachedPlant(
        plant.scientificName
    );

    if (cachedPlant) {

        updateLastAccessed(plant.scientificName)
            .catch(console.error);

        return cachedPlant;
    }

    await saveCachedPlant(plant);

    const savedPlant = await getCachedPlant(
        plant.scientificName
    );

    if (!savedPlant) {
        throw new Error(
            "Failed to retrieve saved plant from cache."
        );
    }

    return savedPlant;
}