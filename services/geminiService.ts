
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client using the process.env.API_KEY directly as required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTechAdvice = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are the ZM Computers AI Advisor. You specialize in wholesale computer hardware, enterprise workstation deployments, and high-end gaming laptops. Provide concise, professional, and knowledgeable advice for bulk purchasers and tech enthusiasts. Use a sophisticated tone.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my database. Please contact our wholesale team directly for immediate assistance.";
  }
};
