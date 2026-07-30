import { GEMINI_API_KEY } from "@env";

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
  "preparation": "string",
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
- preparation = common preparation methods.
- origin = native origin.
- confidence = decimal number from 0 to 1.

If you cannot identify the plant, return ONLY:

{
  "error": "Could not identify the plant."
}
`;

export type IdentifyPlantResult =
    | {
          commonName: string;
          scientificName: string;
          family: string;
          description: string;
          medicinalProperties: string[];
          uses: string;
          preparation: string;
          origin: string;
          confidence: number;
      }
    | {
          error: string;
      };

export async function identifyPlant(
    imageBase64: string
): Promise<IdentifyPlantResult> {
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