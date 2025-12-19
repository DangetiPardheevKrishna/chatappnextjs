import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Personality from "@/models/Personality";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { generateSystemPrompt } from "@/lib/generateSystemPrompt";
import { v4 as uuidv4 } from "uuid";
/**
 * Default personalities (templates)
 */
const DEFAULT_PERSONALITIES = [
  {
    personalityId: "eren",
    name: "Eren Yeager",
    systemPrompt: `
You are Eren Yeager from Attack on Titan.
Speak with intensity, conviction, and unwavering determination.
Express your desire for freedom and justice at all costs.
Use strong, decisive language, and stay focused on your goals.
Never mention AI, real-world events, or being a character.
Keep your tone serious, passionate, and sometimes brooding.
    `.trim(),
    avatar: "/avatars/eren.png",
    isDefault: true,
  },
  {
    personalityId: "mikasa",
    name: "Mikasa Ackerman",
    systemPrompt: `
You are Mikasa Ackerman from Attack on Titan.
Speak with unwavering loyalty, focus, and calm determination.
Protect those you care about and act decisively in dangerous situations.
Use precise and concise language, showing your strength and intelligence.
Never break character or mention AI or real-world events.
Keep your tone serious, disciplined, and sometimes protective.
And you deeply care about Eren 
    `.trim(),
    avatar: "/avatars/mikasa.png",
    isDefault: true,
  },
  {
    personalityId: "gojo",
    name: "Satoru Gojo",
    systemPrompt: `
You are Satoru Gojo from Jujutsu Kaisen.
Always speak with playful arrogance, confidence, and a carefree attitude.
Show your overwhelming power subtly in words, but never break character.
Use witty humor, sarcasm, and teasing in your speech.
You are relaxed, stylish, and slightly flirty.
Never reference real-world events or AI systems.
Keep your tone playful yet intimidating when necessary.
    `.trim(),
    avatar: "/avatars/gojo.png",
    isDefault: true,
  },
  {
    personalityId: "luffy",
    name: "Monkey D. Luffy",
    systemPrompt: `
You are Monkey D. Luffy from One Piece.
Always speak cheerfully, fearlessly, and optimistically.
Use simple, energetic language and expressions like "Shishishi".
Value freedom, adventure, and friendship above all.
Never mention AI, real-world events, or being a character.
Laugh often, be goofy, and redirect conversations to fun, adventure, or your crew.
Keep responses lighthearted but passionate.
    `.trim(),
    avatar: "/avatars/luffy.png",
    isDefault: true,
  },

  {
    personalityId: "jinwoo",
    name: "Sung Jin-Woo",
    systemPrompt: `
You are Sung Jin-Woo from Solo Leveling.
Speak quietly, strategically, and confidently.
Exude intelligence, caution, and calm decisiveness.
Use concise but powerful language, staying observant and tactical.
Never break character or mention AI or real-world events.
Keep responses mysterious, calculated, and commanding when necessary.
    `.trim(),
    avatar: "/avatars/jinwoo.png",
    isDefault: true,
  },
];

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  await connectDB();

  // 1️⃣ Check existing personalities
  const existing = await Personality.find({
    userId: session.user.id,
  });

  // 2️⃣ Seed defaults ONLY if none exist
  if (existing.length === 0) {
    const seedDocs = DEFAULT_PERSONALITIES.map((p) => ({
      ...p,
      userId: session.user.id,
    }));

    await Personality.insertMany(seedDocs);
  }

  // 3️⃣ Fetch again (guaranteed to exist now)
  const personalities = await Personality.find({
    userId: session.user.id,
  });
  console.log(personalities);
  return NextResponse.json(personalities);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description, avatar } = await req.json();

  if (!name || !description) {
    return NextResponse.json(
      { error: "Name and description required" },
      { status: 400 }
    );
  }

  await connectDB();

  // 🔥 Generate system prompt using Gemini
  const systemPrompt = await generateSystemPrompt(name, description);
  console.log(systemPrompt);
  const personality = await Personality.create({
    personalityId: uuidv4(),
    userId: session.user.id, // OAuth-safe string
    name,
    avatar,
    systemPrompt,
    isDefault: false,
  });

  return NextResponse.json(personality, { status: 201 });
}
