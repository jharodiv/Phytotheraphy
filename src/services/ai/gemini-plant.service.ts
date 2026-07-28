import { GeneratedPlantInformation } from "@app-types/gemini-plant.type";
import { GEMINI_API_KEY } from "@env";
import { Timestamp } from "firebase-admin/firestore";

const MODEL_NAME = "gemini-2.5-flash";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

    function isValidPlantResponse(
    data: any
    ): data is Exclude<GeneratedPlantInformation, { error: string }> {
    return (
        typeof data.commonName === "string" &&
        typeof data.scientificName === "string" &&
        typeof data.family === "string" &&
        typeof data.description === "string" &&
        Array.isArray(data.medicinalProperties) &&
        typeof data.uses === "string" &&
        typeof data.preparation_method === "string" &&
        typeof data.origin === "string" &&
        typeof data.side_effect === "string"  &&
        data.generateAt instanceof Timestamp &&
        data.lastAccessedAt instanceof Timestamp &&
        data.expiresAt instanceof Timestamp
    );
    }

    export async function generatePlantInformation(
    scientificName: string
    ): Promise<GeneratedPlantInformation> {
    const prompt = `
    You are a professional botanist and medicinal plant expert.

    Generate medicinal information for the plant with the scientific name:

    "${scientificName}"

    Return ONLY valid JSON.

    {
    "commonName": "...",
    "scientificName": "${scientificName}",
    "family": "...",
    "description": "...",
    "medicinalProperties": [
        "...",
        "..."
    ],
    "uses": "...",
    "preparation_method": "...",
    "origin": "...",
    "side_effect": "...",
    }

    Rules:

    - Return ONLY JSON.
    - Do NOT wrap the JSON in markdown.
    - medicinalProperties must always be an array.
    - If a value is unknown, return an empty string "".
    - Do not invent information outside established botanical knowledge.
    - scientificName must exactly match "${scientificName}".
    `;

    const requestBody = {
        contents: [
        {
            parts: [
            {
                text: prompt,
            },
            ],
        },
        ],
    };

    try {
        const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
        return {
            error: `Gemini request failed (${response.status})`,
        };
        }

        const data = await response.json();

        const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
        return {
            error: "No response received from Gemini.",
        };
        }

        const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

        const parsed = JSON.parse(cleaned);

        if ("error" in parsed) {
        return parsed;
        }

        if (!isValidPlantResponse(parsed)) {
        return {
            error: "Gemini returned an invalid response.",
        };
        }

        return parsed;
    } catch (error) {
        console.error("Gemini Error:", error);

        return {
        error: "Failed to generate plant information.",
        };
    }
}