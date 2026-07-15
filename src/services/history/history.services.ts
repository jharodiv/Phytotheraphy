import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";

import { auth, db } from "../../../firebaseConfig";

import { HistoryModel } from "@models/firestore.models";

import { getExistingHistory } from "@validation/history.validation";

const COLLECTION = "history";

export type HistoryPayload = {
    commonName: string;
    scientificName: string;
    family: string;
    description: string;
    medicinalProperties: string[];
    uses: string;
    preparation: string;
    origin: string;
    confidence: number;
};

export async function createHistory(
    payload: HistoryPayload
): Promise<void> {

    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not authenticated.");
    }

    const existingHistoryId = await getExistingHistory(
        payload.scientificName
    );

    if(existingHistoryId) {
        await updateHistory(existingHistoryId, payload)
        return;
    }

    await addDoc(collection(db, COLLECTION), {

        user_id: user.uid,

        commonName: payload.commonName,
        scientificName: payload.scientificName,

        family: payload.family,
        description: payload.description,

        medicinalProperties: payload.medicinalProperties,

        uses: payload.uses,
        preparation: payload.preparation,

        origin: payload.origin,

        confidence: payload.confidence,

        scanned_at: serverTimestamp(),
    });
}

export async function updateHistory(
    historyId: string,
    payload: HistoryPayload
): Promise<void> {

    await updateDoc(
        doc(db, COLLECTION, historyId),
        {

            commonName: payload.commonName,
            scientificName: payload.scientificName,

            family: payload.family,
            description: payload.description,

            medicinalProperties:
                payload.medicinalProperties,

            uses: payload.uses,
            preparation: payload.preparation,

            origin: payload.origin,

            confidence: payload.confidence,

            scanned_at: serverTimestamp(),
        }
    );
}

export async function getHistory(): Promise<HistoryModel[]> {

    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not authenticated.");
    }

    const snapshot = await getDocs(
        query(
            collection(db, COLLECTION),
            where("user_id", "==", user.uid),
            orderBy("scanned_at", "desc")
        )
    );

    return snapshot.docs.map((document) => ({
        id: document.id,
        ...(document.data() as Omit<HistoryModel, "id">),
    }));
}

export async function deleteHistory(
    historyId: string
): Promise<void> {

    await deleteDoc(
        doc(db, COLLECTION, historyId)
    );
}

export async function clearHistory(): Promise<void> {

    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not authenticated.");
    }

    const snapshot = await getDocs(
        query(
            collection(db, COLLECTION),
            where("user_id", "==", user.uid)
        )
    );

    await Promise.all(
        snapshot.docs.map((document) =>
            deleteDoc(document.ref)
        )
    );
}