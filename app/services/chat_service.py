import requests
from app.config import Config

class ChatService:
    def __init__(self):
        self.api_key = Config.HF_API_KEY
        self.model = "facebook/blenderbot-400M-distill"
        self.api_url = "https://api-inference.huggingface.co/models/"
        
    def get_response(self, message):
        try:
            headers = {"Authorization": f"Bearer {self.api_key}"}
            payload = {
                "inputs": message,
                "parameters": {
                    "max_length": 100,
                    "temperature": 0.7
                }
            }
            
            response = requests.post(
                f"{self.api_url}{self.model}",
                headers=headers,
                json=payload
            )
            
            if response.status_code == 200:
                return response.json()[0]["generated_text"]
            else:
                print(f"Error: {response.status_code} - {response.text}")
                return "I apologize, but I'm having trouble processing your request right now."
                
        except Exception as e:
            print(f"Error generating response: {e}")
            return "I apologize, but I'm having trouble processing your request right now." 