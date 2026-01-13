import { GoogleGenAI } from "@google/genai";

// Standard initialization. 
// Note: Vite will replace process.env.API_KEY with the value from your Vercel Environment Variables.
const apiKey = process.env.API_KEY || "";

export const getTechAdvice = async (prompt: string) => {
  if (!apiKey || apiKey === "undefined") {
    console.warn("Gemini API Key is missing. Please set it in your environment variables.");
    return "I am currently in maintenance mode. Please contact our support team for immediate wholesale assistance.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
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