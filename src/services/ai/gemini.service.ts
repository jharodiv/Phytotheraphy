import { GEMINI_API_KEY } from "@env";

const MODEL_NAME = "gemini-2.5-flash";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

const PROMPT = `
You are a professional botanist and medicinal plant expert.

Analyze the provided image and identify the plant.

Return ONLY valid JSON in the following format.

{
  "commonName": "...",
  "scientificName": "...",
  "family": "...",
  "description": "...",
  "medicinalProperties": [
    "...",
    "..."
  ],
  "uses": "...",
  "preparation": "...",
  "origin": "...",
  "confidence": 0.95
}

Rules:

- Return ONLY JSON.
- Do NOT wrap the JSON in markdown.
- confidence must be a decimal from 0 to 1.
- medicinalProperties must always be an array.
- If a value is unknown, return an empty string "".
- Do not invent information.
- If the image does not contain a medicinal plant, return:

{
  "error": "Could not identify the plant."
}
`;

export type PlantIdentification =
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

function isValidPlantResponse(
  data: any
): data is Exclude<PlantIdentification, { error: string }> {
  return (
    typeof data.commonName === "string" &&
    typeof data.scientificName === "string" &&
    typeof data.family === "string" &&
    typeof data.description === "string" &&
    Array.isArray(data.medicinalProperties) &&
    typeof data.uses === "string" &&
    typeof data.preparation === "string" &&
    typeof data.origin === "string" &&
    typeof data.confidence === "number"
  );
}

export async function identifyPlant(
  imageBase64: string
): Promise<PlantIdentification> {
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

    // Remove markdown if Gemini returns it
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed: any;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return {
        error: "Failed to parse Gemini response.",
      };
    }

    if ("error" in parsed) {
      return parsed;
    }

    if (!isValidPlantResponse(parsed)) {
      return {
        error: "Gemini returned an invalid response.",
      };
    }

    return {  
      commonName: parsed.commonName,
      scientificName: parsed.scientificName,
      family: parsed.family,
      description: parsed.description,
      medicinalProperties: parsed.medicinalProperties,
      uses: parsed.uses,
      preparation: parsed.preparation,
      origin: parsed.origin,
      confidence: parsed.confidence,
    };
  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      error: "Failed to identify the plant. Please try again.",
    };
  }
}