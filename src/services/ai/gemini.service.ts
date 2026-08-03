import { GEMINI_API_KEY } from "@env";
import { GeneratedPlantInformation } from "../../types/gemini-plant.type";



const MODEL_NAME = "gemini-2.5-flash";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

const PROMPT = `
You are a botanical expert.

Analyze the provided image and identify the plant.

Return ONLY valid JSON.

Do not use markdown.
Do not explain your answer.
Do not include any text before or after the JSON.

Return exactly this structure:

{
    "commonName": "string",
    "scientificName": "string",
    "family": "string",
    "description": "string",
    "medicinalProperties": [
        "string"
    ],
    "uses": "string",
    "preparation_method": "string",
    "origin": "string",
    "confidence": 0.95
}

Rules:
- commonName = common English name.
- scientificName = botanical name.
- family = botanical family.
- description = 2-4 sentence summary.
- medicinalProperties = array of medicinal properties.
- uses = medicinal uses.
- preparation_method = common preparation methods.
- origin = native origin.
- confidence = decimal number from 0 to 1.

If you cannot identify the plant, return ONLY:

{
    "error": "Could not identify the plant."
}
`;

export async function identifyPlant(
    imageBase64: string
): Promise<GeneratedPlantInformation> {
    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: PROMPT,
                    },
                    {
                        inlineData: {
                            mimeType: "image/jpeg",
                            data: imageBase64,
                        },
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

        const data = await response.json();

        const text =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.log(data);

            return {
                error: "No response from Gemini.",
            };
        }

        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            console.log(text);

            return {
                error: "Could not parse Gemini response.",
            };
        }

        const parsed = JSON.parse(jsonMatch[0]);

        console.log("Gemini Parsed:");
        console.log(parsed);

        return parsed;
    } catch (error) {
        console.error(error);

        return {
            error: "Failed to identify plant.",
        };
    }
}


/**
 * Generates detailed medicinal information for a plant
 * using its scientific name.
 */
export async function generatePlantInformation(
    scientificName: string
): Promise<GeneratedPlantInformation> {
    const prompt = `
You are a botanical expert.

Generate detailed medicinal information for the following plant.

Scientific Name:
${scientificName}

Return ONLY valid JSON.

Do not use markdown.
Do not explain your answer.
Do not include any text before or after the JSON.

Return exactly this structure:

{
    "commonName": "string",
    "scientificName": "string",
    "family": "string",
    "description": "string",
    "medicinalProperties": [
        "string"
    ],
    "uses": "string",
    "preparation_method": "string",
    "origin": "string",
    "confidence": 0.95
}

Rules:
- Keep the scientificName exactly as provided if it is valid.
- commonName = common English name.
- family = botanical family.
- description = 2–4 sentence summary.
- medicinalProperties = array of medicinal properties.
- uses = medicinal uses.
- preparation_method = common preparation methods.
- origin = native origin.
- confidence = decimal number from 0 to 1.

If you do not recognize the scientific name, return ONLY:

{
    "error": "Could not generate plant information."
}
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
        const data = await response.json();

        const text =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.error("Gemini Response:", data);

            return {
                error: "No response from Gemini.",
            };
        }

        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            console.error("Gemini Raw Response:", text);

            return {
                error: "Could not parse Gemini response.",
            };
        }

        const parsed = JSON.parse(jsonMatch[0]);

        console.log("Gemini Parsed:");
        console.log(parsed);

        return parsed;
    } catch (error) {
        console.error(
            "Failed to generate plant information:",
            error
        );

        return {
            error: "Failed to generate plant information.",
        };
    }
}