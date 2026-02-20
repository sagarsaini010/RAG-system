import  readlinesync  from "readline-sync";
import "dotenv/config";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

async function main(question) {
  const query = question;
  // now call embedding model to convert query into vector
  
// Create embedding model
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-embedding-001",   // or your current embedding model
});

const queryVector = await embeddings.embedQuery(query);

// Create Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

// Now you can use this queryVector to perform similarity search in your Pinecone index

const result = await index.query({
  vector: queryVector,
  topK: 10, // number of similar documents to retrieve
  includeMetadata: true, // include metadata in results if needed
});
// console.log(result.matches);

 // Combine Retrieved Chunks
  const context = result.matches
    .map(match => match.metadata?.text || "")
    .join("\n\n");

//   console.log("\nRetrieved Context:\n");
//   console.log(context.substring(0, 500), "...\n");


  
  //Create Gemini Chat Model

  const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-3-flash-preview",  // fast & good for RAG
    temperature: 0.3,
  });

  
  // Send Context + Question

  const prompt = `
You are a helpful assistant.
Answer the question in detail using the provided context.
If answer is not in context, say "I don't know".

Context:
${context}

Question:
${question}
`;

  const response = await llm.invoke(prompt);

  console.log("\nFinal Answer:\n");
  console.log(response.content);
}

const question= readlinesync.question("What is your question ==>  ");
main(question).catch((error) => {
  console.error("Error:", error.message);
  process.exitCode = 1;
});