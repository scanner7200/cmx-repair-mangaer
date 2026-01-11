
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getAiDiagnostic = async (description: string, deviceType: string) => {
  if (!API_KEY) return "AI Key not configured.";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert computer repair technician. Analyze this repair issue for a ${deviceType}: "${description}". Provide 3 likely causes and suggested next steps for the technician. Keep it concise and professional.`,
    });
    return response.text || "No response from AI.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error getting AI diagnostic.";
  }
};
