import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  const data = await request.formData();
  const files = data.getAll("images");

  if (files.length === 0) {
    return NextResponse.json({
      success: false,
      message: "No images to upload.",
    });
  }

  const uploadPreset = "yfhyp9my";
  const uploadPromises = [];

  for (const file of files) {
    // @ts-ignore
    const bytes = await (file as Blob).arrayBuffer();

    // @ts-ignore
    const mime = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(bytes).toString("base64");
    const fileUri = `data:${mime};${encoding},${base64Data}`;

    const response = cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      upload_preset: uploadPreset,
    });

    uploadPromises.push(response);
  }

  try {
    const uploadResponses = await Promise.all(uploadPromises);
    return NextResponse.json({ success: true, uploadResponses });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "An error occurred while uploading images." });
  }
}


export async function DELETE(request: Request) {
  try {
    const { publicIds } = await request.json();

    const deletionResponses = [];

    for (const publicId of publicIds) {
      const deletionResponse = await cloudinary.uploader.destroy(
        `coolBananasRecipes/${publicId}`,
        { resource_type: "image" }
      );
      if (deletionResponse.result === "ok") {
        deletionResponses.push({
          publicId,
          success: true,
          message: "Image deleted successfully.",
        });
      } else {
        deletionResponses.push({
          publicId,
          success: false,
          message: "Failed to delete the image.",
        });
      }
    }
    return NextResponse.json({
      success: true,
      deletionResponses,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error occurred while deleting the image(s).",
    });
  }
}
