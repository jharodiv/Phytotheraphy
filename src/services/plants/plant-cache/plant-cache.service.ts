import {
    doc,
    getDoc,
} from "firebase/firestore";

import { PlantCacheModel } from "@models/firestore.models";
import { getPlantCacheId } from "utils/plant-cache/plant-cache.utils";
import { db } from '../../../../firebaseConfig';

const PLANT_CACHE = "plant_cache";

export async function getCachedPlant(
    scientificName: string
): Promise<PlantCacheModel | null> {
    const id = getPlantCacheId(scientificName);

    const snapshot = await getDoc(
        doc(db, PLANT_CACHE, id)
    );

    if (!snapshot.exists()){
        return null;
    }

    return snapshot.data() as PlantCacheModel;
} 