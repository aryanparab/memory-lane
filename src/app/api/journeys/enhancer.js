import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyCRP-hz05KMM5hFwZq_NAo-4JfKMHr8Hok");

// ENHANCER FUNCTION
export async function enhanceDescription(text, theme,context) {
  console.log("🔍 enhanceDescription called with:", { text, theme, textType: typeof text });
  
  if (!text || text.trim() === '') {
    console.log("❌ No text to enhance, returning original");
    return text;
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const prompt = `
  Improve this description in an emotional, nostalgic and ${theme} style: "${text}". Provide only one enhanced version under 30 words.`;
  
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

