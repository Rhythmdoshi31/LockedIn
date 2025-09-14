import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();


console.log("Using API key:", process.env.GEMINI_API_KEY?.slice(0, 8));


const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
 async function generatePrompt(prompt: string) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const response = await model.generateContent(prompt);

    const output =
      response.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "⚠️ No response from AI";

    console.log("AI Output:", output);
    return output;
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("AI generation failed");
  }
}
export default generatePrompt;
