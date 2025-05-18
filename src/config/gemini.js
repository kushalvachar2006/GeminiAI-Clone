import { GoogleGenerativeAI } from "@google/generative-ai";
const MODEL_NAME = "gemini-1.0-pro";

const API_KEY = "AIzaSyDc7CGk-aQ3HIUDMEVU_Ot_iLt7vH23aCc"; // Replace with your actual API key

const ai = new GoogleGenerativeAI(API_KEY);
async function runChat(prompt) {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" }); // or "gemini-1.5-flash"
  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(response.text().toString());
  return response.text();
}
export default runChat;
