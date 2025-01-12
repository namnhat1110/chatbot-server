import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/chatbot",
  geminiApiKey: process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY",
};
