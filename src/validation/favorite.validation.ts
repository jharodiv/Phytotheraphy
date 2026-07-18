import { z } from "zod";

export const herbIdSchema = z
    .string()
    .trim()
    .min(1, "Herb ID is required");

export const favoriteModelSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    herb_id: z.string(),
    created_at: z.unknown()
});

export const favoriteModelsSchema = z.array(favoriteModelSchema);