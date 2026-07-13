import {
    collection,
    doc,
    documentId,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import { db } from "../../../firebaseConfig";

export type Plant = {
    id: string;
    commonName: string;
    scientificName: string;
    aliases: string[];
    categories: string[];
    featured: boolean;
    verified: boolean;
    image: string;
};

const PLANTS = "plants";

export const getAllPlants = async (): Promise<Plant[]> => {
    const snapshot = await getDocs(collection(db, PLANTS));

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Plant, "id">),
    }));
};

export const getPlantById = async (
    plantId: string
    ): Promise<Plant | null> => {
    const snapshot = await getDoc(doc(db, PLANTS, plantId));

    if (!snapshot.exists()) return null;

    return {
        id: snapshot.id,
        ...(snapshot.data() as Omit<Plant, "id">),
    };
};

export const getPlantsByIds = async (
    ids: string[]
): Promise<Plant[]> => {
    if (ids.length === 0) return [];

    // Firestore "in" queries support up to 30 values.
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
        snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Plant, "id">),
        }))
    );

    // Preserve the original order of the IDs
    const plantMap = new Map(plants.map((plant) => [plant.id, plant]));

    return ids
        .map((id) => plantMap.get(id))
        .filter((plant): plant is Plant => plant !== undefined);
};

export const getFeaturedPlants = async (): Promise<Plant[]> => {
    const q = query(
        collection(db, PLANTS),
        where("featured", "==", true)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Plant, "id">),
    }));
};

export const getPlantsByCategory = async (
    category: string
    ): Promise<Plant[]> => {
    if (category === "all") {
        return getAllPlants();
    }

    const q = query(
        collection(db, PLANTS),
        where("categories", "array-contains", category)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Plant, "id">),
    }));
};