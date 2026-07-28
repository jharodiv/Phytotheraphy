import { PlantInformation } from "@models/plant-information.model";

export type GeneratedPlantInformation =
    | PlantInformation
    | {
        error: string;
    };