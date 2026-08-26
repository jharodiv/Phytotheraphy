import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore";

import { db } from "../../../../firebaseConfig";

import {
    PlantCacheModel,
    PlantModel,
} from "@models/firestore.models";

import { PlantInformation } from "@models/plant-information.model";

import { searchHerbImage } from "@services/unsplash.service";

import { generatePlantInformation } from "@services/ai/gemini.service";
import { getPlantCacheId } from "utils/plant-cache/plant-cache.utils";

const PLANT_CACHE = "plant_cache";
const PLANTS_COLLECTION = "plants";

const CACHE_DURATION_DAYS = 180;
const DAYS_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Returns an official plant from the `plants`
 * collection using its scientific name.
 */
export async function getPlant(
    scientificName: string
): Promise<PlantModel | null> {
    const plantsRef = collection(
        db,
        PLANTS_COLLECTION
    );

    const q = query(
        plantsRef,
        where(
            "scientificName",
            "==",
            scientificName
        )
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const plantDocument = snapshot.docs[0];

    return {
        id: plantDocument.id,
        ...plantDocument.data(),
    } as PlantModel;
}

/**
 * Returns a cached plant if it exists
 * and has not expired.
 */
export async function getCachedPlant(
    scientificName: string
): Promise<PlantCacheModel | null> {
    const id =
        getPlantCacheId(scientificName);

    const documentRef = doc(
        db,
        PLANT_CACHE,
        id
    );

    const snapshot =
        await getDoc(documentRef);

    if (!snapshot.exists()) {
        return null;
    }

    const cache =
        snapshot.data() as PlantCacheModel;

    // Remove expired cache.
    if (
        cache.expiresAt.toMillis() <=
        Timestamp.now().toMillis()
    ) {
        await deleteDoc(documentRef);

        return null;
    }

    return cache;
}

/**
 * Creates a new unverified plant cache.
 *
 * A new plant also receives an Unsplash image,
 * which is stored together with the cached data.
 */
export async function saveCachedPlant(
    plant: PlantInformation
): Promise<PlantCacheModel> {
    const now = Timestamp.now();

    // Retrieve an image for the newly discovered plant.
    const unsplash =
        await searchHerbImage(
            plant.commonName
        );

    const cache: PlantCacheModel = {
        ...plant,

        verified: false,

        imageUrl:
            unsplash?.imageUrl ?? "",

        photographerName:
            unsplash?.photographerName ?? "",

        photographerUrl:
            unsplash?.photographerUrl ?? "",

        generatedAt: now,

        lastAccessedAt: now,

        expiresAt:
            Timestamp.fromMillis(
                now.toMillis() +
                CACHE_DURATION_DAYS *
                DAYS_IN_MS
            ),
    };

    const id =
        getPlantCacheId(
            plant.scientificName
        );

    await setDoc(
        doc(
            db,
            PLANT_CACHE,
            id
        ),
        cache
    );

    return cache;
}

/**
 * Updates the last accessed timestamp
 * of a cached plant.
 */
export async function updateLastAccessed(
    scientificName: string
): Promise<void> {
    const id =
        getPlantCacheId(
            scientificName
        );

    await updateDoc(
        doc(
            db,
            PLANT_CACHE,
            id
        ),
        {
            lastAccessedAt:
                Timestamp.now(),
        }
    );
}

/**
 * Returns a plant using the following priority:
 *
 * 1. Official `plants` collection
 * 2. `plant_cache`
 * 3. Create a new `plant_cache`
 *
 * The `plants` collection is the source
 * of truth.
 */
export async function getOrCreatePlant(
    scientificName: string
): Promise<PlantModel | PlantCacheModel> {
    try {
        // 1. Check official plants
        const existingPlant =
            await getPlant(
                scientificName
            );

        if (existingPlant) {
            return existingPlant;
        }

        // 2. Check cache
        const cachedPlant =
            await getCachedPlant(
                scientificName
            );

        if (cachedPlant) {
            updateLastAccessed(
                scientificName
            ).catch((error) => {
                console.error(
                    "Failed to update plant cache access time:",
                    error
                );
            });

            return cachedPlant;
        }

        // 3. Generate plant information
        const generatedPlant =
            await generatePlantInformation(
                scientificName
            );

        if ("error" in generatedPlant) {
            throw new Error(
                generatedPlant.error
            );
        }

        // 4. Save generated plant to cache
        const cachedGeneratedPlant =
            await saveCachedPlant(
                generatedPlant
            );

        return cachedGeneratedPlant;

    } catch (error) {
        console.error(
            "Failed to get or create plant:",
            error
        );

        throw new Error(
            "Failed to retrieve plant information."
        );
    }
}