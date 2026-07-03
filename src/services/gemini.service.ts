import { GEMINI_API_KEY } from "@env";

const MODEL_NAME = "gemini-2.5-flash";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
// The prompt that tells Gemini exactly what information to return
const PROMPT = `
You are a botanical expert. 
Analyze the provided image and identify the plant/herb.
Return the information in **strict JSON format** with no extra text, exactly like this:
{
  "commonName": "...",
  "scientificName": "...",
  "medicinalProperties": ["...", "..."],
  "origin": "...",
  "usage": "..."
}
If you cannot identify the plant, return:
{
  "error": "Could not identify the plant."
}
`;

export async function identifyPlant(imageBase64: string): Promise<
  | {
      commonName: string;
      scientificName: string;
      medicinalProperties: string[];
      origin: string;
      usage: string;
    }
  | { error: string }
> {
  const requestBody = {
    contents: [
      {
        parts: [
          { text: PROMPT },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return { error: "No response from Gemini" };
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { error: "Could not parse response" };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return parsed;
  } catch (err) {
    console.error("Gemini API error:", err);
    return { error: "Failed to identify plant. Please try again." };
  }
}
