import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { embeddings } from "./embeddings.js";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex =
  pinecone.index("rag-system");

export const vectorStore =
  await PineconeStore.fromExistingIndex(
    embeddings,
    {
      pineconeIndex,
    }
  );

console.log("Connected to Pinecone!");