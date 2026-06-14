# 🛡️ ScamShield AI

An AI-powered scam detection platform that analyzes suspicious SMS messages, emails, and WhatsApp messages using LLMs to identify phishing attempts, fraud, and social engineering attacks.

## Features

* 🔍 AI-powered scam analysis
* 📊 Risk score generation (0–100)
* 🚨 Scam / Safe classification
* 📝 Explainable AI reasons
* 📈 Visual risk meter
* 🕒 Scan history tracking
* 💾 Persistent history using Local Storage
* ⚡ FastAPI backend
* ⚛️ React frontend
* 🤖 Groq + Llama 3.3 integration

## Tech Stack

### Frontend

* React
* Axios
* Vite

### Backend

* FastAPI
* Groq API
* Llama 3.3 70B Versatile
* Python

## Project Structure

```text
scamshield-ai/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .gitignore
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd scamshield-ai
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt
```

Create a `.env` file:

```env
GROQ_API_KEY=your_api_key_here
```

Run the backend:

```bash
python -m uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## API Endpoint

### Analyze Message

```http
POST /analyze
```

Request:

```json
{
  "text": "URGENT! Verify your account immediately."
}
```

Response:

```json
{
  "risk_score": 80,
  "label": "Scam",
  "reasons": [
    "Urgency tactic used",
    "Potential phishing language detected"
  ]
}
```

## Future Improvements

* Screenshot upload support
* OCR-based scam detection
* Email phishing detection
* URL reputation analysis
* User authentication
* Cloud deployment
* Analytics dashboard

## License

MIT License
