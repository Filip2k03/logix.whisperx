
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getConceptExplanation = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: topic,
      config: {
        systemInstruction: `You are an expert computer science tutor. Explain the following concept clearly and concisely, as if for a university student learning about it for the first time. Use markdown for formatting, including code blocks for examples if applicable. The topic is: ${topic}.`,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching explanation from Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while fetching the explanation: ${error.message}`;
    }
    return "An unknown error occurred while fetching the explanation.";
  }
};
