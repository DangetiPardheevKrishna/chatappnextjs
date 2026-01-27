// lib/uploadToCloudinary.ts
import { cloudinary } from "@/lib/cloudinary";

export const uploadToCloudinary = (buffer: Buffer) => {
  return new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "avatars",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
};
