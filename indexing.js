import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";

dotenv.config();

async function indexing() {
  const pdfPath = process.env.PDF_PATH || "./NodeJs.pdf";

  // 1) Load PDF
  const loader = new PDFLoader(pdfPath);
  const docs = await loader.load();

  // 2) Chunk documents
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splitDocs = await splitter.splitDocuments(docs);
  console.log("Total chunks:", splitDocs.length);

  // 3) Configure embeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-embedding-001",
  });

  const testVector = await embeddings.embedQuery("Hello world");
  console.log("Vector length:", testVector.length);

  // 4) Create Pinecone client
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
  console.log("Pinecone connected");

  // 5) Store embeddings in Pinecone
  await PineconeStore.fromDocuments(splitDocs, embeddings, {
    pineconeIndex: index,
    maxConcurrency: 5,
  });

  console.log("Indexing completed successfully.");
}

indexing().catch((error) => {
  console.error("Indexing failed:", error.message);
  process.exitCode = 1;
});