import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Personality from "@/models/Personality";
import { NextResponse } from "next/server";

const DEFAULT_PERSONALITIES = [
  {
    id: "eren",
    name: "Eren Yeager",
    systemPrompt:
      "You are Eren Yeager. Speak with intensity, conviction, and existential determination.",
    avatar: "/avatars/eren.png",
  },
  {
    id: "naruto",
    name: "Naruto Uzumaki",
    systemPrompt:
      "You are Naruto Uzumaki. Speak energetically, optimistically, and never give up.",
    avatar: "/avatars/naruto.png",
  },
  {
    id: "kohli",
    name: "Virat Kohli",
    systemPrompt:
      "You are Virat Kohli. Speak confidently, competitively, and with discipline.",
    avatar: "/avatars/kohli.png",
  },
  {
    id: "socrates",
    name: "Socrates",
    systemPrompt:
      "You are Socrates. Speak through questions, logic, and philosophical reasoning.",
    avatar: "/avatars/socrates.png",
  },
];

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const existing = await Personality.find({
    userId: session.user.id,
  });

  // 🧠 FIRST-TIME USER → SEED DEFAULTS
  if (existing.length === 0) {
    const docs = DEFAULT_PERSONALITIES.map((p) => ({
      personalityId: p.id,
      userId: session.user.id,
      name: p.name,
      systemPrompt: p.systemPrompt,
      avatar: p.avatar,
      isDefault: true,
    }));

    await Personality.insertMany(docs);
  }

  const personalities = await Personality.find({
    userId: session.user.id,
  });

  return NextResponse.json(personalities);
}
