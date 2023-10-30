import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
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
  const uploadResponses = [];

  for (const file of files) {
    // @ts-ignore
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // @ts-ignore
    const fileName = file.name;

    await writeFile(fileName, buffer);

    const response = await cloudinary.uploader.upload(fileName, {
      upload_preset: uploadPreset,
    });

    uploadResponses.push(response);
  }

  console.log(uploadResponses);
  return NextResponse.json({ success: true, uploadResponses });
}



export async function DELETE(request: Request) {
  try {
    const { urls } = await request.json();
    const deletionResponses = [];

    for (const url of urls) {
      const publicId = extractPublicIdFromUrl(url);

      if (!publicId) {
        return NextResponse.json({
          success: false,
          message: `Invalid URL provided: ${url}`,
        });
      }

      const deletionResponse = await cloudinary.uploader.destroy(publicId);

      if (deletionResponse.result === "ok") {
        deletionResponses.push({
          url,
          success: true,
          message: "Image deleted successfully.",
        });
      } else {
        deletionResponses.push({
          url,
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
