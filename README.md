## **AI-Powered Data Extraction and Processing Notebooks**

This repository contains a collection of Jupyter notebooks and TypeScript repositories acompanying the Cookbooks in the documentation designed to demonstrate and facilitate AI-powered data extraction and processing tasks through Orq.ai. Each notebook serves a specific purpose, from extracting structured data from unstructured sources to generating SQL queries from natural language inputs.


# Orq.ai Tutorials

| Tutorial | Description |
|----------|-------------|
| [Capturing and Leveraging User Feedback](https://docs.orq.ai/docs/tutorials/capturing-feedback-with-orq) | Collect and utilize user feedback to improve your FAQ chatbot's accuracy |
| [Chaining Deployments and Running Evaluations](https://docs.orq.ai/docs/tutorials/chaining-deployments) | Connect multiple deployments and process financial data from image files |
| [Orq.ai Nodes in n8n Workflows](https://docs.orq.ai/docs/tutorials/how-to-use-orqai-nodes-in-n8n-worklfows) | Integrate Orq.ai into your n8n automation workflows |
| [Intent Classification](https://docs.orq.ai/docs/tutorials/intent-classification) | Classify user intents for chatbots and customer support |
| [LLM Glossary](https://docs.orq.ai/docs/tutorials/llm-glossary) | Essential terminology and concepts for working with LLMs |
| [Lovable App Integration](https://docs.orq.ai/docs/tutorials/lovable-integration) | Connect Orq.ai with your Lovable applications |
| [Maintaining Chat History](https://docs.orq.ai/docs/tutorials/maintaining-history-with-a-model) | Manage conversation context in your deployments |
| [Multilingual FAQ Bot Using RAG](https://docs.orq.ai/docs/tutorials/multilingual-faq-bot) | Build a RAG-powered FAQ system supporting multiple languages |
| [Data Extraction from PDF](https://docs.orq.ai/docs/tutorials/pdf-extraction) | Extract structured data from PDF documents |
| [Orq.ai as Prompt Manager](https://docs.orq.ai/docs/tutorials/prompt-manager) | Centralize and version control your prompts |
| [Image-Based Receipt Extraction](https://docs.orq.ai/docs/tutorials/receipt-extraction) | Extract transaction data from receipt images |
| [Text-to-SQL](https://docs.orq.ai/docs/tutorials/text-to-sql) | Generate SQL queries from natural language |
| [Third-Party Vector Databases](https://docs.orq.ai/docs/tutorials/using-thirdparty-vectordbs-with-orq) | Integrate external vector databases with Orq.ai |



#### `Data_Extraction_PDF_Invoices.ipynb`
Extract structured data from PDF invoices with support for various templates.

**Features:**
- Multi-template invoice support
- Pre-processing for noisy or low-quality PDFs
- Output formats: CSV, JSON

#### `Image_Based_Receipt_Extraction.ipynb`
Extract transaction data from receipt images with robust image handling.

**Features:**
- Identifies merchant names, dates, and itemized costs
- Handles image distortion and varying lighting
- JSON output format

### Natural Language Processing

#### `Intent_Classification.ipynb`
Classify user intents for chatbot and customer support applications.

**Features:**
- Pre-trained language models for high accuracy
- Custom intent categories
- Performance evaluation with confusion matrix and metrics

#### `Text_to_SQL.ipynb`
Transform natural language queries into executable SQL statements.

**Features:**
- Wide database schema support
- SQL query validation mechanism
- Ideal for data analysts and non-technical users

## 🚀 Getting Started

1. Clone this repository
2. Install required dependencies (see individual notebooks)
3. Follow the notebook instructions for specific use cases
4. Refer to [Orq.ai documentation](https://docs.orq.ai) for additional support

## 📖 Documentation

For complete documentation, visit [docs.orq.ai](https://docs.orq.ai)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
### 1. Data_Extraction_PDF_Invoices.ipynb

This notebook focuses on extracting structured data from PDF invoices. 
Key Features:

* Supports a variety of invoice templates.

* Provides pre-processing steps for noisy or low-quality PDFs.

* Outputs data in CSV or JSON format.

### 2. Image_Based_Receipt_Extraction.ipynb

This notebook extracts data from images of receipts.

Key Features:

* Identifies merchant names, transaction dates, and itemized costs.

* Handles image distortion and varying lighting conditions.

* Outputs data in user-friendly formats like JSON.

### 3. Intent_Classification.ipynb

This notebook demonstrates natural language processing (NLP) techniques to classify user intents from text inputs. It is designed for applications like chatbots and customer support automation.

Key Features:

* Uses pre-trained language models for high accuracy.

* Supports custom intent categories.

* Provides a confusion matrix and other metrics to evaluate model performance.

### 4. Text_to_SQL.ipynb

This notebook showcases the capability of transforming natural language queries into executable SQL statements. It is particularly useful for data analysts and non-technical users who need to interact with databases.

Key Features:

* Supports SQL generation for a wide range of database schemas.

* Provides a validation mechanism for generated SQL queries.
