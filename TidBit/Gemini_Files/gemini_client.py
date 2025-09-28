import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Configure with your API key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Choose the model
model = genai.GenerativeModel("models/gemini-2.5-flash")

# Run a test prompt
response = model.generate_content("Say hello and explain what this API setup does.")

print(response.text)
