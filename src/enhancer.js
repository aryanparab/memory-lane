import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyCRP-hz05KMM5hFwZq_NAo-4JfKMHr8Hok");

export async function enhanceDescription(text, theme) {
  if (!text) return text;

  // Get the model once (optional optimization: move outside function)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Improve this description in a ${theme} style: "${text}" give only 1 output`;
  console.log("Running this prompt:", prompt);

  try {
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = await response.text();  // call the function to get text string
  console.log("Generated text:", text);
  return text;
} catch (err) {
  console.error('Enhancer Error:', err);
  return text; // fallback to original
}
}
