// Helper function with exponential backoff retry
// const retryWithBackoff = async (fn, maxRetries = 3, initialDelay = 1000) => {
//   let lastError;
//   for (let i = 0; i < maxRetries; i++) {
//     try {
//       return await fn();
//     } catch (error) {
//       lastError = error;
//       // Check if error is rate-limit related
//       if (error.message?.includes('rate') || error.status === 429) {
//         if (i < maxRetries - 1) {
//           const delay = initialDelay * Math.pow(2, i); // exponential backoff
//           console.log(`Rate limited. Retrying in ${delay}ms...`);
//           await new Promise(resolve => setTimeout(resolve, delay));
//           continue;
//         }
//       } else {
//         throw error; // don't retry non-rate-limit errors
//       }
//     }
//   }
//   throw lastError;
// };

import { buildPrompt } from "../context/PromptBulder.js";
const HandelPrompt = async (req, res) => {
  try {
    const { userContext, task } = req.body;
    const prompt = buildPrompt(userContext, task);

    // Validate prompt input
    if (
      !userContext ||
      typeof userContext !== "string" ||
      userContext.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          error: "User context is required and must be a non-empty string",
        });
    }

    const genAI = req.app?.locals?.genAI;
    if (!genAI) {
      console.error("genAI client not initialized");
      return res.status(500).json({ error: "AI client not available" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Use retry logic for generating content
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ reply: response });
  } catch (error) {
    console.error("GenerativeAI error:", error.message);

    // Provide specific error messages based on error type
    if (error.message?.includes("API key")) {
      return res.status(500).json({ error: "API key configuration error" });
    }
    if (error.message?.includes("rate") || error.status === 429) {
      return res
        .status(429)
        .json({
          error:
            "Rate limit exceeded after retries. Please try again in a moment",
        });
    }
    if (error.message?.includes("timeout")) {
      return res
        .status(504)
        .json({ error: "AI service timeout. Please try again" });
    }

    res
      .status(500)
      .json({
        error: "AI service error: " + (error.message || "Unknown error"),
      });
  }
};

export { HandelPrompt };
