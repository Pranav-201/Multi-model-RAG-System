import "dotenv/config";
import { ChatGroq } from "@langchain/groq";

export const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
});