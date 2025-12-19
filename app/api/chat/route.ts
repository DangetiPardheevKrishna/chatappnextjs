import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Message from "@/models/Message";
import Personality from "@/models/Personality";
import { askGemini } from "@/lib/gemini";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const personalityId = searchParams.get("personalityId");

  if (!personalityId) {
    return NextResponse.json(
      { error: "personalityId required" },
      { status: 400 }
    );
  }

  await connectDB();

  // 🔒 Verify ownership
  const personality = await Personality.findOne({
    _id: personalityId,
    userId: session.user.id,
  });

  if (!personality) {
    return NextResponse.json(
      { error: "Personality not found" },
      { status: 404 }
    );
  }

  // Get chat messages for this personality
  const messages = await Message.find({
    personalityId,
    userId: session.user.id,
  })
    .sort({ createdAt: 1 }) // Oldest first
    .lean();

  // Format dates properly for the frontend
  const formattedMessages = messages.map((msg) => ({
    id: msg._id.toString(),
    sender: msg.sender,
    content: msg.content,
    timestamp: msg.createdAt
      ? new Date(msg.createdAt).toISOString()
      : new Date().toISOString(),
    createdAt: msg.createdAt
      ? new Date(msg.createdAt).toISOString()
      : new Date().toISOString(),
  }));

  return NextResponse.json(formattedMessages);
}
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { personalityId, messages } = await req.json();

  if (!personalityId || !messages?.length) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await connectDB();

  // 🔒 Always fetch personality from DB
  const personality = await Personality.findOne({
    _id: personalityId,
    userId: session.user.id,
  });

  if (!personality) {
    return NextResponse.json(
      { error: "Personality not found" },
      { status: 404 }
    );
  }

  // 🧠 Build Gemini messages
  const geminiMessages = [
    {
      role: "system",
      content: personality.systemPrompt,
    },
    ...messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.content,
    })),
  ];

  // 🤖 Ask Gemini
  const reply = await askGemini(geminiMessages);

  // 💾 Save messages
  await Message.insertMany([
    {
      userId: session.user.id,
      personalityId: personality._id,
      sender: "user",
      content: messages[messages.length - 1].content,
    },
    {
      userId: session.user.id,
      personalityId: personality._id,
      sender: "ai",
      content: reply,
    },
  ]);

  return NextResponse.json({ reply });
}
