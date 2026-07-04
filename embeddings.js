import { pipeline } from "@xenova/transformers";

console.log("Loading embedding model...");

const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

console.log("Embedding model loaded!");

export const embeddings = {
  async embedDocuments(texts) {
    const vectors = [];

    for (const text of texts) {
      const output = await extractor(text, {
        pooling: "mean",
        normalize: true,
      });

      vectors.push(Array.from(output.data));
    }

    

    return vectors;
  },

  async embedQuery(text) {
    const output = await extractor(text, {
      pooling: "mean",
      normalize: true,
    });

    return Array.from(output.data);
  },
};