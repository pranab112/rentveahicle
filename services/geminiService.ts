import { GoogleGenAI } from "@google/genai";
import { Vehicle } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateVehicleDescription = async (make: string, model: string, type: string): Promise<string> => {
  if (!apiKey) return "AI Description unavailable (No API Key).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, professional, and appealing description (max 2 sentences) for a vehicle rental listing. 
      Vehicle: ${make} ${model} (${type}). Focus on comfort and reliability.`,
    });
    return response.text?.trim() || "Reliable vehicle available for rent.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Great vehicle available for booking.";
  }
};

export const analyzeFleetAvailability = async (vehicles: Vehicle[], date: string): Promise<string> => {
    if (!apiKey) return "AI Analysis unavailable.";
    
    try {
        const vehicleSummary = vehicles.map(v => `${v.make} ${v.model} (${v.type})`).join(', ');
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Given this fleet: ${vehicleSummary}. 
            The user is asking about availability for ${date}. 
            Write a one-sentence encouraging summary about the fleet's readiness for business.`,
        });
        return response.text?.trim() || "Fleet status updated.";
    } catch (e) {
        return "Fleet data analyzed.";
    }
}