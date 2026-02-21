# 🚀 Gemini + Pinecone RAG System (Node.js)

![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)
![LangChain](https://img.shields.io/badge/LangChain-JS-blue)
![Google Gemini](https://img.shields.io/badge/Google-Gemini-orange?logo=google)
![Pinecone](https://img.shields.io/badge/VectorDB-Pinecone-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

A **production-ready Retrieval-Augmented Generation (RAG) system** built with:

- 🧠 Google Gemini (Embeddings + Chat Model)
- 📦 Pinecone (Vector Database)
- 🔗 LangChain (JavaScript)
- ⚡ Node.js

---

## 📌 Overview

This project demonstrates a complete RAG pipeline:

1. 📄 Load a PDF document  
2. ✂️ Split into chunks  
3. 🧮 Convert chunks into embeddings  
4. 🗄 Store embeddings in Pinecone  
5. ❓ Accept user queries  
6. 🔎 Retrieve relevant chunks  
7. 🤖 Generate grounded answers using Gemini  

---

## 🏗 Architecture

PDF
↓
Chunking
↓
Gemini Embeddings (3072)
↓
Pinecone Vector Storage
↓
User Query
↓
Query Embedding
↓
Similarity Search
↓
Context + Question
↓
Gemini Chat Model
↓
Final Answer
```
---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime |
| LangChain JS | Orchestration |
| Gemini | Embeddings + LLM |
| Pinecone | Vector Database |
| pdf-parse | PDF Processing |

---
```
## 📂 Project Structure

```
RAG-system/
│
├── indexing.js # PDF → Chunk → Embed → Pinecone
├── query.js # Query → Retrieve → Generate Answer
├── sample.pdf # Knowledge source
├── .env # API keys
└── README.md
```

## 🔐 Environment Variables

Create a `.env` file:
```
GOOGLE_API_KEY=your_google_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
```
## 📦 Installation

Clean install dependencies:

```bash
npm install langchain \
@langchain/community \
@langchain/google-genai \
@langchain/pinecone \
@pinecone-database/pinecone@5 \
pdf-parse@1
```

🧠 Pinecone Index Setup

When creating your Pinecone index:

Dimension: 3072

Metric: cosine

Deployment: Serverless

⚠️ Dimension must match Gemini embedding output.

▶️ Usage
1️⃣ Index PDF
```
node indexing.js
```
This will:

Load PDF

Split into chunks

Generate embeddings (3072-dim)

Store vectors in Pinecone

2️⃣ Ask Questions
```
node chatting.js
```

Then enter your question in the terminal.

🧮 Embedding Model

```
gemini-embedding-001
```
Output dimension: 3072

Used for indexing + querying

✅ Features

Semantic similarity search

Context-aware responses

Modular architecture

Clean separation of indexing and querying

Easily extendable to multi-document systems

🔮 Future Improvements

Streaming responses

Source citations

API integration (Express.js)

Frontend UI

Multi-document ingestion

Reranking models

📖 What is RAG?

Retrieval-Augmented Generation improves LLM reliability by:

Retrieving relevant information

Injecting it as context

Generating grounded responses

This reduces hallucination and improves accuracy.

👨‍💻 Author
Sagar Saini
Built with ❤️ using Gemini + Pinecone + LangChain
