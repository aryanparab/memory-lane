import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyCRP-hz05KMM5hFwZq_NAo-4JfKMHr8Hok");

// ENHANCER FUNCTION
export async function enhanceDescription(text, theme) {
  console.log("🔍 enhanceDescription called with:", { text, theme, textType: typeof text });
  
  if (!text || text.trim() === '') {
    console.log("❌ No text to enhance, returning original");
    return text;
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const prompt = `Improve this description in a ${theme} style: "${text}". Provide only one enhanced version.`;
  
  console.log("🤖 Sending prompt to Gemini:", prompt);

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const generatedText = await response.text();
    
    console.log("✅ Gemini response received:", generatedText);
    console.log("🔄 Original vs Enhanced:", { original: text, enhanced: generatedText });
    
    return generatedText.trim();
  } catch (err) {
    console.error('❌ Enhancer Error:', err);
    return text;
  }
}

// MAIN API HANDLER
export async function POST(req) {
  console.log("🚀 API Handler started");
  
  const uploadDir = join(process.cwd(), 'public/uploads');
  const journeyDir = join(process.cwd(), 'public/journeys');

  try {
    await mkdir(uploadDir, { recursive: true });
    await mkdir(journeyDir, { recursive: true });

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
    
    console.log('📖 Extracted values:', { title, theme });

    // Get all image files
    const imageFiles = formData.getAll('images');
    console.log(`📷 Found ${imageFiles.length} image files`);

    const slides = [];

    for (let i = 0; i < imageFiles.length; i++) {
      console.log(`\n🔄 Processing slide ${i}...`);
      
      const file = imageFiles[i];
      
      if (!file || file.size === 0) {
        console.log(`⚠️ Skipping empty file at index ${i}`);
        continue;
      }

      // Generate new filename
      const ext = extname(file.name);
      const newFilename = `${uuidv4()}${ext}`;
      const newPath = join(uploadDir, newFilename);
      
      // Save file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(newPath, buffer);
      console.log(`📁 File saved as: ${newFilename}`);

      // Get description for this slide
      const descFieldName = `desc_${i}`;
      const rawDesc = formData.get(descFieldName) || '';
      
      console.log(`📝 Raw description for slide ${i}:`, { 
        fieldName: descFieldName, 
        rawDesc, 
        type: typeof rawDesc, 
        length: rawDesc?.length 
      });

      let enhancedDescription = rawDesc;
      
      // Only enhance if there's actual text
      if (rawDesc && rawDesc.trim() !== '') {
        console.log(`🧠 Starting enhancement for slide ${i}...`);
        try {
          const beforeEnhancement = rawDesc;
          enhancedDescription = await enhanceDescription(rawDesc, theme);
          console.log(`🎯 Enhancement result for slide ${i}:`, {
            before: beforeEnhancement,
            after: enhancedDescription,
            changed: beforeEnhancement !== enhancedDescription
          });
        } catch (e) {
          console.error(`❌ Error enhancing slide ${i}:`, e);
          enhancedDescription = rawDesc;
        }
      } else {
        console.log(`⚠️ No description for slide ${i}, using empty string`);
      }

      const slideData = {
        images: [{ filename: newFilename }],
        description: enhancedDescription,
      };

      console.log(`📋 Slide ${i} data:`, slideData);
      slides.push(slideData);
    }

    const journeyId = uuidv4();
    const journeyData = {
      id: journeyId,
      title,
      theme,
      slides,
    };

    console.log('💾 Final journey data before saving:', JSON.stringify(journeyData, null, 2));

    const jsonPath = join(journeyDir, `${journeyId}.json`);
    await writeFile(jsonPath, JSON.stringify(journeyData, null, 2));
    
    console.log(`✅ Journey saved to: ${jsonPath}`);

    return NextResponse.json({ success: true, id: journeyId });
    
  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}