import { writeFile, mkdir, rename } from 'fs/promises';
import { join, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyCRP-hz05KMM5hFwZq_NAo-4JfKMHr8Hok");

// ENHANCER FUNCTION
export async function enhanceDescription(text, theme) {
  if (!text || text.trim() === '') return text;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Improve this description in a ${theme} style: "${text}". Provide only one enhanced version.`;
  console.log("Running this prompt:", prompt);

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const generatedText = await response.text();
    console.log("Generated text:", generatedText);
    return generatedText.trim(); // Added trim to remove extra whitespace
  } catch (err) {
    console.error('Enhancer Error:', err);
    return text;
  }
}

// Helper function to safely extract field values
function getFieldValue(fields, fieldName) {
  const field = fields[fieldName];
  if (Array.isArray(field)) {
    return field[0] || '';
  }
  return field || '';
}

// API CONFIG
export const config = {
  api: {
    bodyParser: false,
  },
};

// MAIN API HANDLER
export async function POST(req) {
  const uploadDir = join(process.cwd(), 'public/uploads');
  const journeyDir = join(process.cwd(), 'public/journeys');

  try {
    await mkdir(uploadDir, { recursive: true });
    await mkdir(journeyDir, { recursive: true });

    const form = formidable({
      multiples: true,
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024,
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Safely extract field values
    const title = getFieldValue(fields, 'title') || 'Untitled Journey';
    const theme = getFieldValue(fields, 'theme') || 'romantic';

    console.log('📝 Received fields:', Object.keys(fields));
    console.log('🎨 Theme:', theme);
    console.log('📖 Title:', title);

    // Handle files - ensure it's always an array
    let uploadedFiles = [];
    if (files.images) {
      uploadedFiles = Array.isArray(files.images) ? files.images : [files.images];
    }

    const slides = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const ext = extname(file.originalFilename);
      const newFilename = `${uuidv4()}${ext}`;
      const newPath = join(uploadDir, newFilename);
      
      // Fixed: Properly extract description field
      const rawDesc = getFieldValue(fields, `desc_${i}`) || '';
      
      console.log(`📝 Raw description for slide ${i}:`, rawDesc);

      await rename(file.filepath, newPath);

      let enhancedDescription = rawDesc;
      
      // Only enhance if there's actual text to enhance
      if (rawDesc && rawDesc.trim() !== '') {
        try {
          console.log(`🧠 Enhancing description for slide ${i}:`, rawDesc);
          enhancedDescription = await enhanceDescription(rawDesc, theme);
          console.log(`✅ Enhanced for slide ${i}:`, enhancedDescription);
        } catch (e) {
          console.error(`❌ Error enhancing slide ${i}:`, e);
          enhancedDescription = rawDesc; // Fallback to original
        }
      } else {
        console.log(`⚠️ No description provided for slide ${i}, skipping enhancement`);
      }

      slides.push({
        images: [{ filename: newFilename }],
        description: enhancedDescription,
      });
    }

    const journeyId = uuidv4();
    const journeyData = {
      id: journeyId,
      title,
      theme,
      slides,
    };

    console.log('💾 Saving journey data:', JSON.stringify(journeyData, null, 2));

    await writeFile(join(journeyDir, `${journeyId}.json`), JSON.stringify(journeyData, null, 2));

    return NextResponse.json({ success: true, id: journeyId });
  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}