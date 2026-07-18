import { z } from "zod";

export const UsernameSchema = z
    .string()
    .trim()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(
        /^\w+$/,
        "Username can only contain letters, numbers, and underscores."
    );

export const FullNameSchema = z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(2, "Full name is too short")
    .max(100, "Full name is too long")

export const PhotoURLSchema = z
    .string()
    .trim()
    .refine(
        (value) => {
            if (value === "") return true;

            try {
                new URL(value);
                return (true);
            } catch {
                return false;
            }
        },
        {
            message: 
                "Invalid photo URL.",
        }
    )