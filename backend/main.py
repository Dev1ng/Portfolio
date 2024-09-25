from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import requests

app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/submit-form")
async def submit_form(request: Request):
    # Retrieve form data from the frontend
    form_data = await request.json()

    # Get the access key from environment variables
    access_key = os.getenv('ACCESS_KEY')

    if not access_key:
        return {"error": "API key not found"}

    # Prepare the payload to send to Web3Forms
    payload = {
        "access_key": access_key,
        **form_data
    }

    try:
        # Make the POST request to Web3Forms
        response = requests.post("https://api.web3forms.com/submit", json=payload)
        return response.json()
    except Exception as e:
        return {"error": "Something went wrong"}
