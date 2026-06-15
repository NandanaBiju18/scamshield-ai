from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os
import json
from fastapi.responses import JSONResponse
from fastapi import Request
# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# FastAPI app
app = FastAPI(title="ScamShield AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://scamshield-ai-omega.vercel.app",
    "http://localhost:5173"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

allow_origins=[
    "https://scamshield-ai-omega.vercel.app",
    "http://localhost:5173"
],

# Request model
class MessageRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "ScamShield AI Backend Running"}

@app.post("/analyze")
def analyze(req: MessageRequest):

    prompt = f"""
You are a cybersecurity scam detection expert.

Analyze the message below.

Return ONLY valid JSON in this format:

{{
    "risk_score": 0,
    "label": "Safe",
    "reasons": []
}}

Rules:
- risk_score must be between 0 and 100
- label must be one of:
  Safe
  Suspicious
  Scam
- reasons must be a list of short explanations

Message:
{req.text}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0
        )

        content = response.choices[0].message.content

        # Remove markdown wrappers if model adds them
        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

        data = json.loads(content)

        return data

    except Exception as e:
        return {
            "risk_score": 50,
            "label": "Error",
            "reasons": [
                str(e)
            ]
        }