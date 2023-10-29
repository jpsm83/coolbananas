import {NextResponse} from 'next/server';
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
          
dotenv.config(); // Load environment variables from .env file

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

export async function POST(){
const data = await request.formData();
  const image: image | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  //   const filePath = `/tmp/${file.name}`
  const filePath = path.join(process.cwd(), "public", file.name);
  await writeFile(filePath, buffer);
  console.log(`open ${filePath} to see the uploaded file`);

  return NextResponse.json({ success: true });}