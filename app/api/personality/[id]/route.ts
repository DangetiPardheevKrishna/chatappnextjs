import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Personality from "@/models/Personality";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { generateSystemPrompt } from "@/lib/generateSystemPrompt";
import { cloudinary } from "@/lib/cloudinary";

// Type for route parameters
interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  // Await the params Promise
  const { id } = await params;

  const personality = await Personality.findOne({
    _id: id, // Use _id (MongoDB ID field)
    userId: session.user.id,
  });

  if (!personality) {
    return NextResponse.json(
      { error: "Personality not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(personality);
}

export async function PUT(req: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await params;

  const existingPersonality = await Personality.findOne({
    _id: id,
    userId: session.user.id,
  });

  if (!existingPersonality) {
    return NextResponse.json(
      { error: "Personality not found" },
      { status: 404 }
    );
  }

  if (existingPersonality.isDefault) {
    return NextResponse.json(
      { error: "Cannot edit default personalities" },
      { status: 403 }
    );
  }

  // ✅ READ FORMDATA
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File | null;
  const avatar = formData.get("avatar") as string | null;

  if (!name || !description) {
    return NextResponse.json(
      { error: "Name and description required" },
      { status: 400 }
    );
  }

  let avatarUrl = existingPersonality.avatar;

  // ✅ IF NEW IMAGE → UPLOAD TO CLOUDINARY
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

  // ✅ ELSE IF PRESET AVATAR CHANGED
  else if (avatar) {
    avatarUrl = avatar;
  }

  // ✅ REGENERATE SYSTEM PROMPT
  const systemPrompt = await generateSystemPrompt(name, description);

  const updatedPersonality = await Personality.findByIdAndUpdate(
    id,
    {
      name,
      description,
      avatar: avatarUrl,
      systemPrompt,
    },
    { new: true }
  );

  return NextResponse.json(updatedPersonality);
}

export async function DELETE(req: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  // Await the params Promise
  const { id } = await params;

  console.log("Deleting personality with ID:", id);

  // Check if personality exists and belongs to user
  const existingPersonality = await Personality.findOne({
    _id: id, // Use _id (MongoDB ID field)
    userId: session.user.id,
  });

  if (!existingPersonality) {
    return NextResponse.json(
      { error: "Personality not found" },
      { status: 404 }
    );
  }

  // Don't allow deleting default personalities
  if (existingPersonality.isDefault) {
    return NextResponse.json(
      { error: "Cannot delete default personalities" },
      { status: 403 }
    );
  }

  await Personality.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
