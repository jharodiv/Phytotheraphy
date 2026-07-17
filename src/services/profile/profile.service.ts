import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";

import {
    FullNameSchema,
    PhotoURLSchema,
    UsernameSchema
} from "@validation/profile.validation";

import {
    updateProfile,
    User,
} from "firebase/auth";

import { auth, db } from "../../../firebaseConfig";

export interface UserProfile {
    id: string;
    username: string;
    fullName: string;
    email: string;
    photoURL: string;
}

const COLLECTION = "users";

/**
 * Returns the currently authenticated Firebase user.
 */
export const getCurrentUser = (): User => {
    const user = auth.currentUser

    if (!user){
        throw new Error ("User is not authenticated");
    }

    return user;
};

/**
 * Creates a Firestore profile document if it doesn't exist.
 */
export const createUserProfile = async () => {
    
    const user = getCurrentUser();

    const userRef = doc(db, COLLECTION, user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        await setDoc(userRef, {
            username: "",
            fullName: user.displayName ?? "",
            email: user.email ?? "",
            photoURL: user.photoURL ?? "",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    }
};

/**
 * Returns the user's profile.
 */
export const getUserProfile = async (): Promise<UserProfile> => {

    const user = getCurrentUser();

    const userRef = doc(db, COLLECTION, user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        await createUserProfile();

        return {
            id: user.uid,
            username: "",
            fullName: user.displayName ?? "",
            email: user.email ?? "",
            photoURL: user.photoURL ?? "",
        };
    }

    const data = snapshot.data();

    /**
     * Automatically migrate older users.
     */
    const updates: Record<string, unknown> = {};

    if (!("username" in data)) {
        updates.username = "";
    }

    if (!("fullName" in data)) {
        updates.fullName = data.name ?? user.displayName ?? "";
    }

    if (!("photoURL" in data)) {
        updates.photoURL = "";
    }

    if (Object.keys(updates).length > 0) {
        updates.updatedAt = serverTimestamp();
        await updateDoc(userRef, updates);
    }

    return {
        id: user.uid,
        username: data.username ?? "",
        fullName: data.fullName ?? data.name ?? "",
        email: data.email ?? user.email ?? "",
        photoURL: data.photoURL ?? "",
    };
};

/**
 * Updates the user's username.
 */
export const updateUsername = async (
    username: string
) => {
    const user = getCurrentUser();

    const validatedUsername = UsernameSchema.parse(username);

    await updateDoc(doc(db, COLLECTION, user.uid), {
        username: validatedUsername,
        updatedAt: serverTimestamp(),
    });
};

/**
 * Updates the user's full name.
 *
 * Updates both Firebase Auth and Firestore.
 */
export const updateFullName = async (
    fullName: string
) => {

    const user = getCurrentUser();
    const validatedName = FullNameSchema.parse(fullName);

    await updateProfile(user, {
        displayName: validatedName,
    });

    await updateDoc(doc(db, COLLECTION, user.uid), {
        fullName: validatedName,
        updatedAt: serverTimestamp(),
    });
};

/**
 * Updates the user's profile photo.
 */
export const updateProfilePhoto = async (
    photoURL: string
) => {
    const user = getCurrentUser();
    const validatedPhotoUrl = PhotoURLSchema.parse(photoURL);

    await updateProfile(user, {
        photoURL: validatedPhotoUrl,
    });

    await updateDoc(doc(db, COLLECTION, user.uid), {
        photoURL: validatedPhotoUrl,
        updatedAt: serverTimestamp(),
    });
};