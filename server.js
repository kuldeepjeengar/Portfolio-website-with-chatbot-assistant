const express = require('express');
const cors = require('cors');
const { HfInference } = require('@huggingface/inference');

const app = express();
const port = 3000;

// Initialize Hugging Face Inference
const hf = new HfInference(process.env.HF_API_KEY); // Get API key from environment variables

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Use a free model from Hugging Face
        const response = await hf.textGeneration({
            model: 'facebook/blenderbot-400M-distill',
            inputs: message,
            parameters: {
                max_length: 100,
                temperature: 0.7
            }
        });

        res.json({ response: response.generated_text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 