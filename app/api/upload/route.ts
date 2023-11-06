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
  const uploadResponses: any[] = [];

  for (const file of files) {
    // @ts-ignore
    const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    // @ts-ignore
    let mime = file.type;
    let encoding = "base64";

    let base64Data = Buffer.from(bytes).toString("base64");
    let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(fileUri, {
          invalidate: true,
          upload_preset: uploadPreset,
        })
        .then((result) => {
          console.log(result);
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
    uploadResponses.push(response);
  }
  return NextResponse.json({ success: true, uploadResponses });
}

//     const response = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({ upload_preset: uploadPreset }, (error, result) => {
//           if (error) {
//             reject(error);
//           }
//           resolve(result);
//         })
//         .end(buffer);
//     });
//     uploadResponses.push(response);
//   }
//   return NextResponse.json({ success: true, uploadResponses });
// }

export async function DELETE(request: Request) {
  try {
    const { publicIds } = await request.json();
    const deletionResponses = [];
    for (const publicId of publicIds) {
      const deletionResponse = await cloudinary.uploader.destroy(
        `coolBananasRecipes/${publicId}`,
        { resource_type: "image" }
      );
      console.log(deletionResponse);
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
