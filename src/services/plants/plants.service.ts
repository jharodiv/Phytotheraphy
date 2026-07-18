import {
    collection,
    doc,
    documentId,
    getDoc,
    getDocs,
    query,
    QueryDocumentSnapshot,
    where
} from "firebase/firestore";

import { PlantModel } from "@models/firestore.models";
import { db } from "../../../firebaseConfig";

const PLANTS = "plants";

// Converts a Firestore document into a PlantModel
const mapPlant = (
    snapshot: QueryDocumentSnapshot
): PlantModel => ({
    id: snapshot.id,
    ...(snapshot.data() as Omit<PlantModel, "id">),
});

// Retrieve all plant from the firestore plants collection

export const getAllPlants = async (): Promise<PlantModel[]> => {
    const snapshot = await getDocs(collection(db, PLANTS));

    return snapshot.docs.map(mapPlant);
};

//Retrieve a single plant by its document ID

export const getPlantById = async (
    plantId: string
): Promise<PlantModel | null> => {
    const snapshot = await getDoc(doc(db, PLANTS, plantId));

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...(snapshot.data() as Omit<PlantModel, "id">),
    };
};

/**
 * Retrieves multiple plants using their document IDs.
 *
 * Firestore limits "in" queries to 30 IDs per request,
 * so the IDs are automatically split into chunks.
 * The returned array preserves the original order of the IDs.
 *
 */

export const getPlantsByIds = async (
    ids: string[]
): Promise<PlantModel[]> => {
    if (ids.length === 0) {
        return [];
    }

    const chunkSize = 30;
    const chunks: string[][] = [];

    for (let i = 0; i < ids.length; i += chunkSize) {
        chunks.push(ids.slice(i, i + chunkSize));
    }

    const snapshots = await Promise.all(
        chunks.map((chunk) =>
            getDocs(
                query(
                    collection(db, PLANTS),
                    where(documentId(), "in", chunk)
                )
            )
        )
    );

    const plants = snapshots.flatMap((snapshot) =>
        snapshot.docs.map(mapPlant)
    );

    const plantMap = new Map(plants.map((plant) => [plant.id, plant]));

    return ids
        .map((id) => plantMap.get(id))
        .filter((plant): plant is PlantModel => plant !== undefined);
};

/**
 * Retrieves all plants marked as featured.
 *
 * @returns A list of featured plants.
 */

export const getFeaturedPlants = async (): Promise<PlantModel[]> => {
    const q = query(
        collection(db, PLANTS),
        where("featured", "==", true)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(mapPlant);
};

/**
 * Retrieves plants that belong to a specific category.
 *
 * Passing "all" returns every plant without filtering.
 *
 * @param category The category to filter by.
 * @returns A list of plants in the specified category.
 */

export const getPlantsByCategory = async (
    category: string
): Promise<PlantModel[]> => {
    if (category === "all") {
        return getAllPlants();
    }

    const q = query(
        collection(db, PLANTS),
        where("categories", "array-contains", category)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(mapPlant);
};







