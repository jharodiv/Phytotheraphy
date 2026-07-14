import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

type RegisterValidation = {
    email: string;
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * Checks if an email already exists.
     */
    export async function isEmailTaken(
    email: string
    ): Promise<boolean> {
    const normalizedEmail = email.trim().toLowerCase();

    const snapshot = await getDocs(
        query(
        collection(db, "users"),
        where("email", "==", normalizedEmail)
        )
    );

    return !snapshot.empty;
    }

    /**
     * Checks if a username already exists.
     */
    export async function isUsernameTaken(
    username: string
    ): Promise<boolean> {
    const normalizedUsername = username
        .trim()
        .toLowerCase();

    const snapshot = await getDocs(
        query(
        collection(db, "users"),
        where("username", "==", normalizedUsername)
        )
    );

    return !snapshot.empty;
    }

    /**
     * Validates the registration form.
     *
     * Returns:
     * - null if valid
     * - error message if invalid
     */
    export async function validateRegister(
    payload: RegisterValidation
    ): Promise<string | null> {
    const {
        email,
        fullName,
        username,
        password,
        confirmPassword,
    } = payload;

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username
        .trim()
        .toLowerCase();

    if (
        !normalizedEmail ||
        !fullName.trim() ||
        !normalizedUsername ||
        !password ||
        !confirmPassword
    ) {
        return "Please fill in all fields.";
    }

    if (!emailRegex.test(normalizedEmail)) {
        return "Please enter a valid email.";
    }

    if (fullName.trim().length < 3) {
        return "Full name must be at least 3 characters.";
    }

    if (normalizedUsername.length < 3) {
        return "Username must be at least 3 characters.";
    }

    if (!/^[a-zA-Z0-9._]+$/.test(normalizedUsername)) {
        return "Username can only contain letters, numbers, '.' and '_'.";
    }

    if (password.length < 6) {
        return "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }

    if (await isEmailTaken(normalizedEmail)) {
        return "Email is already registered.";
    }

    if (await isUsernameTaken(normalizedUsername)) {
        return "Username is already taken.";
    }

    return null;
    }

    /**
     * Validates login.
     */
    export function validateLogin(
    email: string,
    password: string
    ): string | null {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
        return "Please fill in all fields.";
    }

    if (!emailRegex.test(normalizedEmail)) {
        return "Please enter a valid email.";
    }

    return null;
}