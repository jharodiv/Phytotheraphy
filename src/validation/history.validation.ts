import { z } from "zod";

export const HistorySchema = z.object({
    commonName: z
        .string()
        .trim()
        .min(1, "Common name is required.")
        .max(100, "Common name is too long."),

    scientificName: z
        .string()
        .trim()
        .min(1, "Scientific name is required.")
        .max(150, "Scientific name is too long."),

    family: z
        .string()
        .trim()
        .min(1, "Family is required.")
        .max(100, "Family is too long."),

    description: z
        .string()
        .trim()
        .min(1, "Description is required."),

    medicinalProperties: z
        .array(z.string().trim().min(1))
        .min(1, "At least one medicinal property is required."),

    uses: z
        .string()
        .trim()
        .min(1, "Uses is required."),

    preparation: z
        .string()
        .trim()
        .min(1, "Preparation is required."),

    origin: z
        .string()
        .trim()
        .min(1, "Origin is required."),

    confidence: z
        .number()
        .min(0, "Confidence must be at least 0.")
        .max(100, "Confidence cannot exceed 100."),
});

export type HistoryPayload = z.infer<typeof HistorySchema>;