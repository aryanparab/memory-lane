import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import {enhanceDescription} from "./enhancer"
import { authOptions} from "../auth/[...nextauth]/route"
import { getServerSession } from 'next-auth';
import clientPromise from "../../../lib/mongodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { throws } from 'assert';

// MAIN API HANDLER
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
export async function POST(req) {
  console.log("🚀 API Handler started");
  
  const session = await getServerSession(authOptions);
  if(!session) return new Response("Unauthorized",{"status":401});
  const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });

  try {
   

    console.log("📝 Parsing FormData...");
    
    // Use Next.js built-in FormData parsing
    const formData = await req.formData();
    
    console.log("✅ FormData parsed successfully");
    
    // Log all entries for debugging
    console.log("📋 All FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, typeof value === 'string' ? value : `[File: ${value.name}]`);
    }

    // Extract basic fields
    const title = formData.get('title') || 'Untitled Journey';
    const theme = formData.get('theme') || 'romantic';
    const journey_context = formData.get('context')||theme;
    console.log('📖 Extracted values:', { title, theme });

    // Get all image files
    const imageFiles = formData.getAll('images');
    console.log(`📷 Found ${imageFiles.length} image files`);

    const slides = [];
   
    for (let i = 0; i < imageFiles.length; i++) {

      if (i%10==0 && i>0){
        await sleep(60000);
      }

      console.log(`\n🔄 Processing slide ${i}...`);
      
      const file = imageFiles[i];
      
      if (!file || file.size === 0) {
        console.log(`⚠️ Skipping empty file at index ${i}`);
        continue;
      }

      // Generate new filename
      const ext = extname(file.name);
      const baseFilename = `${uuidv4()}${ext}`;
      const s3Key = `${session.user.email}/${baseFilename}`;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: s3Key,
        Body: buffer,
        ContentType: file.type,
        //ACL: 'public-read' 
      };
          try {
        await s3.send(new PutObjectCommand(s3Params));
        console.log(`📤 Uploaded to S3: ${s3Key}`);
      } catch (s3Error) {
        console.error(`❌ S3 Upload failed for ${s3Key}:`, s3Error);
console.error("Error details:", s3Error.stack || s3Error.message || s3Error);

        console.error(`❌ S3 Upload failed for ${s3Key}:`, s3Error);
        throw new Error("S3 Upload failed");
      }
      // Get description for this slide
      const descFieldName = `desc_${i}`;
      const rawDesc = formData.get(descFieldName) || '';
      
      // console.log(`📝 Raw description for slide ${i}:`, { 
      //   fieldName: descFieldName, 
      //   rawDesc, 
      //   type: typeof rawDesc, 
      //   length: rawDesc?.length 
      // });

      let enhancedDescription = rawDesc;
      
      // Only enhance if there's actual text
      if (rawDesc && rawDesc.trim() !== '') {
        console.log(`🧠 Starting enhancement for slide ${i}...`);
        try {
          const beforeEnhancement = rawDesc;
          
          enhancedDescription = await enhanceDescription(rawDesc, theme,journey_context);
          // console.log(`🎯 Enhancement result for slide ${i}:`, {
          //   before: beforeEnhancement,
          //   after: enhancedDescription,
          //   changed: beforeEnhancement !== enhancedDescription
          // });
        } catch (e) {
          console.error(`❌ Error enhancing slide ${i}:`, e);
          enhancedDescription = rawDesc;
        }
      } else {
        console.log(`⚠️ No description for slide ${i}, using empty string`);
      }

      const slideData = {
        images: [{ filename: s3Key }],
        description: enhancedDescription,
      };


      console.log(`📋 Slide ${i} data:`, slideData);
      slides.push(slideData);
    }

    const journeyId = uuidv4();
    const journeyData = {
      id: journeyId,
       userId: session.user.email,
      title,
      context:journey_context,
      theme,
      slides,
    };

    // console.log('💾 Final journey data before saving:', JSON.stringify(journeyData, null, 2));

    // const jsonPath = join(journeyDir, `${journeyId}.json`);
    // await writeFile(jsonPath, JSON.stringify(journeyData, null, 2));
    
    // console.log(`✅ Journey saved to: ${jsonPath}`);
    const client = await clientPromise;
    const db = client.db('memorylane');
    await db.collection('journeys').insertOne(journeyData);

    return NextResponse.json({ success: true, id: journeyId });
    
  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}