import { getPlantsByIds } from "@services/favorites/plants.service";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    where
} from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

export type FavoritePlant = {
    id: string;
    commonName: string;
    scientificName: string;
    aliases: string[];
    categories: string[];
    featured: boolean;
    verified: boolean;
    image: string;
};

const FAVORITES = "favorites";
const PLANTS = "plants";

export const getCurrentUserId = () => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not logged in.");
    }

    return user.uid;
};

export const getFavoritePlantIds = async (): Promise<string[]> => {
    const uid = getCurrentUserId();

    const q = query(
        collection(db, FAVORITES),
        where("user_id", "==", uid)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data().plant_id as string);
};

export const getFavoritePlants = async () => {
    const ids = await getFavoritePlantIds();

    return getPlantsByIds(ids);
};

export const isFavorite = async (
    plantId: string
    ): Promise<boolean> => {
    const uid = getCurrentUserId();

    const q = query(
        collection(db, FAVORITES),
        where("user_id", "==", uid),
        where("plant_id", "==", plantId)
    );

    const snapshot = await getDocs(q);

    return !snapshot.empty;
};

export const addFavorite = async (
    plantId: string
    ): Promise<void> => {
    const uid = getCurrentUserId();

    const exists = await isFavorite(plantId);

    if (exists) return;

    await addDoc(collection(db, FAVORITES), {
        user_id: uid,
        plant_id: plantId,
        created_at: serverTimestamp(),
    });
};

export const removeFavorite = async (
    plantId: string
    ): Promise<void> => {
    const uid = getCurrentUserId();

    const q = query(
        collection(db, FAVORITES),
        where("user_id", "==", uid),
        where("plant_id", "==", plantId)
    );

    const snapshot = await getDocs(q);

    await Promise.all(
        snapshot.docs.map((favorite) =>
        deleteDoc(doc(db, FAVORITES, favorite.id))
        )
    );
};

export const toggleFavorite = async (
    plantId: string
    ): Promise<boolean> => {
    const favorite = await isFavorite(plantId);

    if (favorite) {
        await removeFavorite(plantId);
        return false;
    }

    await addFavorite(plantId);
    return true;
};