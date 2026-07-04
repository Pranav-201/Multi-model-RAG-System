# Multi-model-RAG-System

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366F1,100:22D3EE&height=220&section=header&text=RAG%20System&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Chat%20with%20your%20PDFs%20using%20LangChain,%20Pinecone%20%26%20Groq&descAlignY=58&descSize=18" width="100%"/>

<br/>

<a href="#">
  <img src="https://readme-typing-svg.demolab.com/?lines=Retrieval+Augmented+Generation+Engine;Local+Embeddings+%2B+Pinecone+%2B+Groq+LLM;Production-grade+RAG+Architecture+in+Node.js;Chat+with+any+PDF+in+seconds!&font=Fira%20Code&center=true&width=680&height=45&color=22D3EE&vCenter=true&size=22&pause=1200"/>
</a>

<br/><br/>

<img src="https://img.shields.io/badge/Node.js-≥18-3C873A?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/LangChain.js-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white"/>
<img src="https://img.shields.io/badge/Pinecone-000000?style=for-the-badge&logo=pinecone&logoColor=white"/>
<img src="https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white"/>
<img src="https://img.shields.io/badge/Transformers.js-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black"/>

<br/>

<img src="https://img.shields.io/github/stars/yourusername/rag-system?style=social"/>
<img src="https://img.shields.io/github/forks/yourusername/rag-system?style=social"/>
<img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/status-active--development-orange?style=flat-square"/>

</div>

<br/>

## 📖 Table of Contents

- [Overview](#-overview)
- [Architecture](#️-architecture)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Retrieval Pipeline Deep Dive](#-retrieval-pipeline-deep-dive)
- [Roadmap](#-roadmap)
- [Learning Outcomes](#-learning-outcomes)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

<br/>

## 🧩 Overview

**RAG System** is an end-to-end **Retrieval Augmented Generation** pipeline built entirely in **Node.js**, designed to let you have natural language conversations with your own PDF documents.

Instead of relying on an LLM's frozen training data, this system:

1. **Ingests** your PDFs and splits them into semantically meaningful chunks
2. **Embeds** those chunks locally (no API cost) using Transformers.js
3. **Stores & indexes** the vectors in Pinecone for fast similarity search
4. **Retrieves** the most relevant chunks for any user question using MMR
5. **Generates** grounded, hallucination-resistant answers using Groq's blazing-fast LLM inference

> 💡 Think of it as giving an LLM an "open-book exam" — it only answers using what it retrieves from *your* documents.

<br/>

## 🏗️ Architecture

### End-to-End Flow

```mermaid
flowchart TD
    A[📄 PDF Document] --> B[PDFLoader]
    B --> C[✂️ Text Chunking<br/>LangChain Splitters]
    C --> D[🧠 Local Embeddings<br/>Transformers.js]
    D --> E[(🌲 Pinecone<br/>Vector Database)]

    F[❓ User Question] --> G[🧠 Question Embedding]
    G --> H{🔍 Similarity Search<br/>+ MMR Retrieval}
    E -.-> H
    H --> I[📚 Top-K Relevant Chunks]
    I --> J[⚡ Groq LLM]
    J --> K[✅ Final Grounded Answer]

    style A fill:#6366F1,stroke:#fff,color:#fff
    style E fill:#0F9D58,stroke:#fff,color:#fff
    style J fill:#F55036,stroke:#fff,color:#fff
    style K fill:#22D3EE,stroke:#fff,color:#000
```

### Sequence: What Happens on Every Query

```mermaid
sequenceDiagram
    actor User
    participant CLI as Console Chat
    participant Embed as Transformers.js
    participant PC as Pinecone
    participant LLM as Groq LLM

    User->>CLI: Ask a question
    CLI->>Embed: Generate query embedding
    Embed-->>CLI: Query vector
    CLI->>PC: Similarity + MMR search
    PC-->>CLI: Top-K relevant chunks
    CLI->>LLM: Prompt (context + question)
    LLM-->>CLI: Grounded answer
    CLI-->>User: 💬 Final Answer
```

### Two-Pipeline Design

| Pipeline | When it Runs | Purpose |
|---|---|---|
| 🗂️ **Ingestion** | Once, or when docs change (`node index.js`) | Load → Chunk → Embed → Store in Pinecone |
| 💬 **Retrieval + Generation** | Every user query (`node test.js`) | Embed query → Search → Retrieve → Generate answer |

<br/>

## ✨ Features

| | Feature | Description |
|---|---|---|
| ✅ | **PDF Upload & Processing** | Load and parse any PDF via `PDFLoader` |
| ✅ | **Smart Text Chunking** | LangChain text splitters for semantically coherent chunks |
| ✅ | **Local Embeddings** | Zero-cost, offline embedding generation via Transformers.js |
| ✅ | **Vector Storage** | Persistent, scalable storage & indexing in Pinecone |
| ✅ | **Semantic Search** | Cosine-similarity based retrieval over embedded chunks |
| ✅ | **MMR Retrieval** | Max Marginal Relevance to reduce redundant/duplicate chunks |
| ✅ | **Interactive Console Chat** | Real-time Q&A loop directly from your terminal |
| ✅ | **Production-Grade Design** | Modular files, `.env`-based config, clean separation of concerns |

<br/>

## 🛠️ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=nodejs,js" height="50"/>
&nbsp;&nbsp;
<img src="https://img.shields.io/badge/LangChain.js-1C3C3C?style=flat-square&logo=langchain&logoColor=white" height="28"/>
<img src="https://img.shields.io/badge/Pinecone-000000?style=flat-square&logo=pinecone&logoColor=white" height="28"/>
<img src="https://img.shields.io/badge/Groq-F55036?style=flat-square&logo=groq&logoColor=white" height="28"/>
<img src="https://img.shields.io/badge/Transformers.js-FFD21E?style=flat-square&logo=huggingface&logoColor=black" height="28"/>

</div>

| Library | Purpose |
|---|---|
| `@langchain/community` | PDF loading |
| `@langchain/textsplitters` | Text chunking |
| `@langchain/pinecone` | Pinecone integration for LangChain |
| `@pinecone-database/pinecone` | Vector database client |
| `@xenova/transformers` | Local embedding generation |
| `@langchain/groq` | LLM inference via Groq |

<br/>

## 📂 Project Structure

```text
RAG_System/
│
├── prepare.js         # Loads, chunks, and prepares documents
├── index.js            # Runs full ingestion pipeline → Pinecone
├── askQuestion.js       # Handles query embedding + retrieval logic
├── vectorStore.js       # Pinecone client & vector store setup
├── llm.js               # Groq LLM configuration & prompt handling
├── test.js              # Interactive console chat entry point
├── policy.pdf           # Sample source document
├── .env                 # API keys (not committed)
└── package.json
```

<br/>

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/rag-system.git
cd rag-system

# Install dependencies
npm install
```

<br/>

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
PINECONE_API_KEY=your_pinecone_api_key
GROQ_API_KEY=your_groq_api_key
```

> ⚠️ Never commit your `.env` file. Add it to `.gitignore`.

<br/>

## 💬 Usage

### Step 1 — Index Your Documents

```bash
node index.js
```

This will:
- 📄 Load the PDF
- ✂️ Split it into chunks
- 🧠 Generate embeddings locally
- 🌲 Store vectors in Pinecone

### Step 2 — Start Chatting

```bash
node test.js
```

**Example session:**

```text
You: What is an instance?
Bot: An instance is an object created from a class.

You: What is inheritance?
Bot: Inheritance allows a class to acquire properties and behavior
     from another class, promoting code reuse.
```

<br/>

## 🔍 Retrieval Pipeline Deep Dive

```mermaid
flowchart LR
    Q[Question] --> E[Embed Query]
    E --> S[Pinecone Similarity Search]
    S --> M{MMR Re-ranking}
    M --> C[Top Relevant Chunks]
    C --> P[Prompt Construction]
    P --> L[Groq LLM]
    L --> A[Answer]

    style Q fill:#6366F1,color:#fff
    style L fill:#F55036,color:#fff
    style A fill:#22D3EE,color:#000
```

**Why MMR (Max Marginal Relevance)?**
Plain top-K similarity search often returns near-duplicate chunks. MMR balances **relevance** to the query with **diversity** among selected chunks — giving the LLM a broader, less redundant context window and improving answer quality.

<br/>

## 🗺️ Roadmap

### 📈 Current Improvements
- [x] MMR Retrieval
- [x] Better Chunking Strategy
- [x] Prompt Engineering
- [x] Interactive Console Chat

### 🚀 Future Improvements
- [ ] Web Interface (React/Next.js frontend)
- [ ] Source Citations in Answers
- [ ] Hybrid Search (Vector + BM25/Keyword)
- [ ] Reranking (Cross-Encoder)
- [ ] Multi-Query Retrieval
- [ ] Conversational Memory
- [ ] Image Embeddings
- [ ] Voice Embeddings
- [ ] Multi-Modal RAG
- [ ] Agentic RAG (self-directed multi-hop retrieval)

### 🖼️ Upcoming: Image RAG
- Image embeddings
- Visual similarity search
- Visual Question Answering (VQA)

### 🎙️ Upcoming: Voice RAG
- Speech-to-Text ingestion
- Audio embeddings
- Voice chat with documents

<br/>

## 🎯 Learning Outcomes

<div align="center">

<img src="https://img.shields.io/badge/Vector%20Databases-6366F1?style=flat-square"/>
<img src="https://img.shields.io/badge/Embeddings-22D3EE?style=flat-square"/>
<img src="https://img.shields.io/badge/Semantic%20Search-0F9D58?style=flat-square"/>
<img src="https://img.shields.io/badge/RAG-F55036?style=flat-square"/>
<img src="https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white"/>
<img src="https://img.shields.io/badge/Pinecone-000000?style=flat-square&logo=pinecone&logoColor=white"/>
<img src="https://img.shields.io/badge/Prompt%20Engineering-FFD21E?style=flat-square"/>
<img src="https://img.shields.io/badge/LLM%20Integration-8B5CF6?style=flat-square"/>
<img src="https://img.shields.io/badge/Production%20AI%20Systems-EF4444?style=flat-square"/>

</div>

<br/>

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<br/>

## 👨‍💻 Author

<div align="center">

### **Pranav Amrutkar**

Electronics & Telecommunication Engineering @ VIIT Pune
Full Stack Developer • GenAI Enthusiast • Building AI Products & RAG Systems

<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
<img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/>

</div>

<br/>

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

<br/>

<div align="center">

### ⭐ If you found this project useful, please consider giving it a star!

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:22D3EE,100:6366F1&height=120&section=footer" width="100%"/>

</div>
