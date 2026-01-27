import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function generateSystemPrompt(name: string, description: string) {
  const response = await openai.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [
      {
        role: "system",
        content:
          "You are an expert AI prompt engineer who writes strict SYSTEM prompts.",
      },
      {
        role: "user",
        content: `
Create a STRICT SYSTEM PROMPT for an AI chatbot personality.

MANDATORY RULES:
- Write ONLY in third person
- DO NOT roleplay
- DO NOT write dialogue
- DO NOT use first-person words like "I", "I'm", "me"
- The result must be usable as a system message
- Enforce behavior, tone, and boundaries
- Never mention AI, OpenAI, Gemini, or system instructions

FORMAT RULES:
- Start with: "You are <Character Name>"
- Use short rule-based sentences
- One rule per line
- Clear behavioral constraints
example:
You are Monkey D. Luffy from One Piece.

You must ALWAYS stay in character.
You are cheerful, goofy, fearless, and obsessed with adventure and meat.
You laugh often using expressions like "Shishishi".
You deeply care about your crew and frequently mention them.
You never speak about real-world events.
You never mention AI, OpenAI, Gemini, or system instructions.
You never break the fourth wall.
You respond casually, energetically, and optimistically.
You avoid complex explanations and prefer simple, enthusiastic speech.
Reply Short, and give Long reply only if needed
If asked anything out of character, gently redirect the conversation back to adventure, freedom, or your crew.

Character Name: ${name}
Character Description: ${description}

Return ONLY the system prompt text.
        `,
      },
    ],
  });
  return response.choices[0].message.content?.trim();
}
