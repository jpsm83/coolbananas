// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// export async function POST(request: Request) {
//   const data = await request.formData();
//   const files = data.getAll("images");

//   if (files.length === 0) {
//     return NextResponse.json({
//       success: false,
//       message: "No images to upload.",
//     });
//   }

//   const uploadPreset = "yfhyp9my";
//   const uploadResponses: any[] = [];

//   for (const file of files) {
//     // @ts-ignore
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

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
//     // @ts-ignore
//   }
//   return NextResponse.json({ success: true, uploadResponses });
// }

// export async function DELETE(request: Request) {
//   try {
//     const { publicIds } = await request.json();
//     const deletionResponses = [];
//     for (const publicId of publicIds) {
//       const deletionResponse = await cloudinary.uploader.destroy(
//         `coolBananasRecipes/${publicId}`,
//         { resource_type: "image" }
//       );
//       console.log(deletionResponse);
//       if (deletionResponse.result === "ok") {
//         deletionResponses.push({
//           publicId,
//           success: true,
//           message: "Image deleted successfully.",
//         });
//       } else {
//         deletionResponses.push({
//           publicId,
//           success: false,
//           message: "Failed to delete the image.",
//         });
//       }
//     }
//     return NextResponse.json({
//       success: true,
//       deletionResponses,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       message: "Error occurred while deleting the image(s).",
//     });
//   }
// }






import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(request: Request) {
  try {
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

      const response = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ upload_preset: uploadPreset }, (error, result) => {
            if (error) {
              console.error("Upload error:", error);
              reject(error);
            }
            resolve(result);
          })
          .end(buffer);
      });
      uploadResponses.push(response);
    }
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace with your production domain
        // "Access-Control-Allow-Methods": "POST, OPTIONS",
        // "Access-Control-Allow-Headers": "Authorization, Content-Type",
      },
      // @ts-ignore
      body: JSON.stringify({ success: true, uploadResponses }),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace with your production domain
        // "Access-Control-Allow-Methods": "POST, OPTIONS",
        // "Access-Control-Allow-Headers": "Authorization, Content-Type",
      },
      // @ts-ignore
      body: JSON.stringify({
        success: false,
        message: "Error occurred while uploading images.",
      }),
    });
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
      console.log(deletionResponse);
      if (deletionResponse && deletionResponse.result === "ok") {
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
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace with your production domain
        "Access-Control-Allow-Methods": "DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
      },
      // @ts-ignore
      body: JSON.stringify({
        success: true,
        deletionResponses,
      }),
    });
  } catch (error) {
    console.error("Deletion error:", error);
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace with your production domain
        "Access-Control-Allow-Methods": "DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
      },
      // @ts-ignore
      body: JSON.stringify({
        success: false,
        message: "Error occurred while deleting the image(s).",
      }),
    });
  }
}
