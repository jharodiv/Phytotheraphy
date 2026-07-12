import { getPlantsByIds } from "@services/favorites/plants.service";
import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    updateDoc,
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

const USERS = "users";

export const getCurrentUserId = (): string => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not logged in.");
    }

    return user.uid;
};

const getUserRef = () => {
    const uid = getCurrentUserId();
    return doc(db, USERS, uid);
};

export const getFavoritePlantIds = async (): Promise<string[]> => {
    const userRef = getUserRef();
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        return [];
    }

    const data = snapshot.data();

    return data.favorites ?? [];
};

export const getFavoritePlants = async (): Promise<FavoritePlant[]> => {
    const ids = await getFavoritePlantIds();

    if (ids.length === 0) {
        return [];
    }

    return getPlantsByIds(ids);
};

export const isFavorite = async (
    plantId: string
): Promise<boolean> => {
    const favorites = await getFavoritePlantIds();

    return favorites.includes(plantId);
};

export const addFavorite = async (
    plantId: string
): Promise<void> => {
    const userRef = getUserRef();

    await updateDoc(userRef, {
        favorites: arrayUnion(plantId),
    });
};

export const removeFavorite = async (
    plantId: string
): Promise<void> => {
    const userRef = getUserRef();

    await updateDoc(userRef, {
        favorites: arrayRemove(plantId),
    });
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