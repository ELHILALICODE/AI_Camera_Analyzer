require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 3000;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Allow large payloads for image data

// Converts a data URL to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(data, mimeType) {
    return {
        inlineData: {
            data: data.split(',')[1], // Remove the "data:image/jpeg;base64," part
            mimeType
        },
    };
}

// API Endpoint for AI Analysis
app.post('/api/generate', async (req, res) => {
    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ error: 'No image data provided.' });
    }

    try {
        console.log('Received image. Sending to Google AI for analysis...');
        
        const prompt = "Describe the image.";
        const imagePart = fileToGenerativePart(image, "image/jpeg");

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const description = response.text();

        console.log('Analysis complete. Description:', description);
        res.json({ description });

    } catch (error) {
        console.error("Error calling Google AI:", error);
        res.status(500).json({ error: 'Failed to analyze image with Google AI.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
