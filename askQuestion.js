import { vectorStore } from "./vectorStore.js";
import { llm } from "./llm.js";

export async function askQuestion(question) {
  const docs = await vectorStore.maxMarginalRelevanceSearch(
    question,
    {
      k: 10,
      fetchK: 40,
    }
  );

  const context = docs
    .map((doc) => doc.pageContent)
    .join("\n\n");

    const relevantDocs =
  await vectorStore.similaritySearch(
    question,
    8
  );
// console.log(
//   relevantDocs.map((d, i) => ({
//     chunk: i + 1,
//     text: d.pageContent,
//   }))
// );
  const prompt = `
You are a helpful assistant.

Answer ONLY from the provided context.

Do not contradict yourself.
Do not add unnecessary disclaimers.
Combine information from multiple chunks into one coherent answer.."

Context:
${context}

Question:
${question}
`;

  const response = await llm.invoke(prompt);

  return response.content;
}