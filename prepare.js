import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { embeddings } from "./embeddings.js";

export async function indexTheDocument(filePath) {
  try {
    // 1. Load PDF
    const loader = new PDFLoader(filePath, {
      splitPages: false,
    });

    const docs = await loader.load();

    // 2. Chunk the document
    const textSplitter =
      new RecursiveCharacterTextSplitter({
        chunkSize: 1200,
        chunkOverlap: 250,
      });

    const texts = await textSplitter.splitText(
      docs[0].pageContent
    );

    console.log(`Created ${texts.length} chunks`);

    // 3. Convert chunks into LangChain Documents
    const documents = texts.map((chunk, index) => ({
      pageContent: chunk,
      metadata: {
        source: filePath,
        chunkIndex: index,
      },
    }));

    // 4. Connect to Pinecone
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const pineconeIndex =
      pinecone.index("rag-system");

    // 5. Store documents in Pinecone
    const vectorStore =
      await PineconeStore.fromDocuments(
        documents,
        embeddings,
        {
          pineconeIndex,
        }
      );

    console.log(
      "Documents stored successfully in Pinecone!"
    );

    return vectorStore;
  } catch (error) {
    console.error(
      "Error indexing document:",
      error
    );
  }
}