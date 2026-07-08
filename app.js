const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const app = express();
app.use(express.json());
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
  try {
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    res.json({ reply: response.text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process AI' });
  }
});
app.listen(3000);