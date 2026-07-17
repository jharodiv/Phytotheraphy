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

import { db } from "../../../firebaseConfig";

import { HistoryModel } from "@models/firestore.models";
import {
    HistoryPayload,
    HistorySchema,
} from "@validation/history.validation";

import { getExistingHistory } from "@helper/history/history.helper";
import { getCurrentUser } from "@services/auth.service";

const COLLECTION = "history";

/**
 * Creates a new history record.
 *
 * If the herb has already been scanned by the user,
 * the existing history is updated instead.
 */
export const createHistory = async (
    payload: HistoryPayload
): Promise<void> => {
    const user = getCurrentUser();

    const validatedPayload = HistorySchema.parse(payload);

    const existingHistoryId = await getExistingHistory(
        validatedPayload.scientificName
    );

    if (existingHistoryId) {
        await updateHistory(
            existingHistoryId,
            validatedPayload
        );
        return;
    }

    await addDoc(collection(db, COLLECTION), {
        user_id: user.uid,

        commonName: validatedPayload.commonName,
        scientificName: validatedPayload.scientificName,

        family: validatedPayload.family,
        description: validatedPayload.description,

        medicinalProperties:
            validatedPayload.medicinalProperties,

        uses: validatedPayload.uses,
        preparation: validatedPayload.preparation,
        origin: validatedPayload.origin,

        confidence: validatedPayload.confidence,

        scanned_at: serverTimestamp(),
    });
};

/**
 * Updates an existing history record.
 */
export const updateHistory = async (
    historyId: string,
    payload: HistoryPayload
): Promise<void> => {
    const validatedPayload = HistorySchema.parse(payload);

    await updateDoc(
        doc(db, COLLECTION, historyId),
        {
            commonName: validatedPayload.commonName,
            scientificName: validatedPayload.scientificName,

            family: validatedPayload.family,
            description: validatedPayload.description,

            medicinalProperties:
                validatedPayload.medicinalProperties,

            uses: validatedPayload.uses,
            preparation: validatedPayload.preparation,
            origin: validatedPayload.origin,

            confidence: validatedPayload.confidence,

            scanned_at: serverTimestamp(),
        }
    );
};

/**
 * Returns all history records of the current user.
 */
export const getHistory = async (): Promise<
    HistoryModel[]
> => {
    const user = getCurrentUser();

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
};

/**
 * Deletes a single history record.
 */
export const deleteHistory = async (
    historyId: string
): Promise<void> => {
    await deleteDoc(
        doc(db, COLLECTION, historyId)
    );
};

/**
 * Deletes all history records of the current user.
 */
export const clearHistory = async (): Promise<void> => {
    const user = getCurrentUser();

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
};