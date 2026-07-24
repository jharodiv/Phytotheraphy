import { FavoriteModel } from "@models/firestore.models";
import { getPlantsByIds } from "@services/plants/plants.service";
import {
    herbIdSchema
} from "@validation/favorite.validation";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

const FAVORITES = "favorites";

const getCurrentUserId = (): string => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not logged in.");
    }

    return user.uid;
};

const favoritesRef = collection(db, FAVORITES);

/**
 * Returns all favorite records of the current user.
 */
export const getFavorites = async (): Promise<FavoriteModel[]> => {
    const uid = getCurrentUserId();

    const q = query(
        favoritesRef,
        where("user_id", "==", uid)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<FavoriteModel, "id">),
    }));
};

/**
 * Returns the total number of favorite records
 * of the current user.
 */

export const getFavoriteCount =  async (): Promise<number> => {
    const favorite = await getFavorites();
    return favorite.length;
}

/**
 * Returns all favorite herb ids.
 */
export const getFavoriteHerbIds = async (): Promise<string[]> => {
    const favorites = await getFavorites();

    return favorites.map((favorite) => favorite.herb_id);
};

/**
 * Returns all favorite plants.
 */
export const getFavoritePlants = async () => {
    const herbIds = await getFavoriteHerbIds();

    if (herbIds.length === 0) {
        return [];
    }

    return getPlantsByIds(herbIds);
};

/**
 * Checks whether the herb is already favorited.
 */
export const isFavorite = async (
    herbId: string
): Promise<boolean> => {
    herbIdSchema.parse(herbId);
    
    const uid = getCurrentUserId();

    const q = query(
        favoritesRef,
        where("user_id", "==", uid),
        where("herb_id", "==", herbId)
    );

    const snapshot = await getDocs(q);

    return !snapshot.empty;
};

/**
 * Creates a favorite record.
 */
export const addFavorite = async (
    herbId: string
): Promise<void> => {
    herbIdSchema.parse(herbId);

    const uid = getCurrentUserId();

    const exists = await isFavorite(herbId);

    if (exists) return;

    await addDoc(favoritesRef, {
        user_id: uid,
        herb_id: herbId,
        created_at: serverTimestamp(),
    });
};

/**
 * Deletes a favorite record.
 */
export const removeFavorite = async (
    herbId: string
): Promise<void> => {
    herbIdSchema.parse(herbId);
    const uid = getCurrentUserId();

    const q = query(
        favoritesRef,
        where("user_id", "==", uid),
        where("herb_id", "==", herbId)
    );

    const snapshot = await getDocs(q);

    const deletions = snapshot.docs.map((favoriteDoc) =>
        deleteDoc(doc(db, FAVORITES, favoriteDoc.id))
    );

    await Promise.all(deletions);
};

/**
 * Toggles favorite status.
 * Returns true if favorited, false if removed.
 */
export const toggleFavorite = async (
    herbId: string
): Promise<boolean> => {
    herbIdSchema.parse(herbId);
    const favorite = await isFavorite(herbId);

    if (favorite) {
        await removeFavorite(herbId);
        return false;
    }

    await addFavorite(herbId);
    return true;
};