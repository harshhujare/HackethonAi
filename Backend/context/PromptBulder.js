import { STATIC_CONTEXT } from "./aicontext.js";

export function buildPrompt({ userContext, task }) {
  return `
${STATIC_CONTEXT}

USER CONTEXT:
${userContext || "No specific user data provided."}

TASK:
${task}

RULES:
- Use simple language
- Bullet points only
- Max 120 words
- Do not assume missing information
`;
}