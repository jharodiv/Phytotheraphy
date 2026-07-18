import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import { auth, db } from "../../../firebaseConfig";

const COLLECTION = "history";

export async function getExistingHistory(
    scientificName: string
): Promise<string | null> {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not authenticated.");
    }

    const snapshot = await getDocs(
        query(
            collection(db, COLLECTION),
            where("user_id", "==", user.uid),
            where("scientificName", "==", scientificName.trim())
        )
    );

    if (snapshot.empty) {
        return null;
    }

    return snapshot.docs[0].id;
}