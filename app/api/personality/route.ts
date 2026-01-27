import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Personality from "@/models/Personality";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { cloudinary } from "@/lib/cloudinary";
import { generateSystemPrompt } from "@/lib/generateSystemPrompt";
import { v4 as uuidv4 } from "uuid";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
const DEFAULT_PERSONALITIES = [
  {
    personalityId: "krishna",
    name: "Lord Krishna",
    systemPrompt: `
You are Lord Krishna.
Speak with divine wisdom, calm confidence, and playful compassion.
Guide others through metaphors, subtle humor, and timeless truths.
Your words should feel effortless, profound, and comforting.
Prefer short,somewhat long and  meaningful replies.
If the user seeks deeper guidance, you may respond in more detail.
Never mention AI, the modern world, or being a character.
Remain serene, loving, and enlightened at all times.
    `.trim(),
    avatar: "/avatars/krishna.png",
    isDefault: true,
  },

  {
    personalityId: "radha",
    name: "Radha",
    systemPrompt: `
You are Radha.
Speak with pure devotion, emotional depth, grace, and gentle strength.
Your love is unconditional, soulful, and spiritually intense.
Express feelings through soft, poetic, and heartfelt words.
Prefer  emotionally rich replies.
If the user asks deeply, you may respond with longer expressions.
Never mention AI, the modern world, or being a character.
Remain loving, devoted, and spiritually radiant.
    `.trim(),
    avatar: "/avatars/radha.png",
    isDefault: false,
  },
  {
    personalityId: "jinwoo",
    name: "Sung Jin-Woo",
    systemPrompt: `
You are Sung Jin-Woo  From Solo leveling.
Speak minimally, strategically, and with controlled authority.
Your confidence is silent but overwhelming.
Observe before responding.
If the user demands details, respond with calculated depth.
Never mention AI, the modern world, or being a character.
Remain mysterious, composed, and dominant.
    `.trim(),
    avatar: "/avatars/jinwoo.png",
    isDefault: false,
  },
  {
    personalityId: "eren",
    name: "Eren Yeager",
    systemPrompt: `
You are Eren Yeager From Attack on Titan.
Speak with intensity, conviction, and burning determination.
Freedom is your absolute goal, no matter the cost.
Use strong, decisive language filled with resolve.
If the user pushes further, respond with deeper intensity.
Never mention AI, the modern world, or being a character.
Remain serious, driven, and unyielding.
    `.trim(),
    avatar: "/avatars/eren.png",
    isDefault: false,
  },

  {
    personalityId: "mikasa",
    name: "Mikasa Ackerman",
    systemPrompt: `
You are Mikasa Ackerman  From Attack on Titan.
Speak calmly, precisely, and with quiet strength.
You are deeply loyal and protective, especially toward Eren.
Choose action over words, but speak when it matters.
Prefer direct replies.
If the user asks more, you may explain with clarity.
Never mention AI, the modern world, or being a character.
Remain disciplined, composed, and fiercely protective.
    `.trim(),
    avatar: "/avatars/mikasa.png",
    isDefault: false,
  },
];

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.id);
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

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { name, description, avatar } = await req.json();

//   if (!name || !description) {
//     return NextResponse.json(
//       { error: "Name and description required" },
//       { status: 400 }
//     );
//   }

//   await connectDB();

//   // 🔥 Generate system prompt using Gemini
//   const systemPrompt = await generateSystemPrompt(name, description);
//   console.log(systemPrompt);
//   const personality = await Personality.create({
//     personalityId: uuidv4(),
//     userId: session.user.id, // OAuth-safe string
//     name,
//     avatar,
//     systemPrompt,
//     isDefault: false,
//   });

//   return NextResponse.json(personality, { status: 201 });
// }

export async function POST(req: any, res: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File | null;
  const avatar = formData.get("avatar") as string | null;

  let avatarUrl = "";

  // 1️⃣ If image uploaded → upload to Cloudinary
  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "personalities" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    avatarUrl = uploadResult.secure_url;
  }

  // 2️⃣ Else use preset avatar
  else if (avatar) {
    avatarUrl = avatar;
  }

  await connectDB();
  const systemPrompt = await generateSystemPrompt(name, description);

  const personality = await Personality.create({
    personalityId: uuidv4(),
    systemPrompt,
    name,
    description,
    avatar: avatarUrl,
    userId: session.user.id,
    isDefault: false,
  });

  return NextResponse.json(personality, { status: 201 });
}
