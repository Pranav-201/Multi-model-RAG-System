// implementation

//  Stage 1
// 1.load the document- pdf,text
// 2.chunk the document
// 3.Generate vector embeddings for each chunk
// 4.Store the embeddings in a vector database (e.g., Pinecone, Weaviate, FAISS)

// Stage 2
// 1.Receive a user query
// 2.Add reterieval step to fetch relevant chunks from the vector database based on the query
// 3.pass input+ relevant chunks to the LLM for generating a response
// 4. Return the response to the user

import {indexTheDocument} from "./prepare.js";

const filePath='./notes.pdf';
indexTheDocument(filePath);
