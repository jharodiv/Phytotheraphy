                                                                  import { UserModel } from "@models/firestore.models";
import { getPlantsByIds } from "@services/plants/plants.service";
import { herbIdSchema } from "@validation/favorite.validation";
import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

const USERS = "users";

/**
 * Returns the uid of the currently authenticated user.
 */
const getCurrentUserId = (): string => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not logged in.");
    }

    return user.uid;
};

/**
 * Returns the Firestore document reference
 * of the current authenticated user.
 */
const getUserRef = () => {
    const uid = getCurrentUserId();
    return doc(db, USERS, uid);
};

/**
 * Returns the current user's Firestore document.
 */
const getUser = async (): Promise<UserModel> => {
    const snapshot = await getDoc(getUserRef());

    if (!snapshot.exists()) {
        throw new Error("User document not found.");
    }

    return {
        id: snapshot.id,
        ...(snapshot.data() as Omit<UserModel, "id">),
    };
};

/**
 * Returns all favorite herb ids.
 */
export const getFavoriteHerbIds = async (): Promise<string[]> => {
    const user = await getUser();

    return user.favorites ?? [];
};

/**
 * Returns the total number of favorites.
 */
export const getFavoriteCount = async (): Promise<number> => {
    const favorites = await getFavoriteHerbIds();

    return favorites.length;
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
 * Checks whether the herb is already in the user's favorites.
 */
export const isFavorite = async (
    herbId: string
): Promise<boolean> => {
    herbIdSchema.parse(herbId);

    const favorites = await getFavoriteHerbIds();

    return favorites.includes(herbId);
};

/**
 * Adds a herb to the user's favorites.
 */
export const addFavorite = async (
    herbId: string
): Promise<void> => {
    herbIdSchema.parse(herbId);

    await updateDoc(getUserRef(), {
        favorites: arrayUnion(herbId),
    });
};

/**
 * Removes a herb from the user's favorites.
 */
export const removeFavorite = async (
    herbId: string
): Promise<void> => {
    herbIdSchema.parse(herbId);

    await updateDoc(getUserRef(), {
        favorites: arrayRemove(herbId),
    });
};

/**
 * Toggles a herb's favorite status.
 *
 * Returns:
 * - true  -> herb was added
 * - false -> herb was removed
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