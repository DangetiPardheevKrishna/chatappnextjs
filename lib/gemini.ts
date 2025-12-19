import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function askGemini(messages: any[]) {
  const response = await openai.chat.completions.create({
    model: "gemini-2.5-flash",
    messages,
  });

  return response.choices[0].message.content;
}
