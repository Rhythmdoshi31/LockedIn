import { Router, type Request, type Response } from "express";
import generatePrompt from "../service/ai.service.js";

const router = Router();
router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Incoming body:", req.body);

    // destructure properly
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await generatePrompt(prompt);
    res.json({ output: response });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});
export default router;
