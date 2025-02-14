import { Configuration, OpenAIApi } from 'openai';
import { verifyToken } from '../../../lib/middleware/auth';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify user token
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'Token is missing or invalid' });
    }

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful medical assistant providing health recommendations. Keep responses concise and focused on general health advice. Do not provide specific medical diagnoses or treatment recommendations."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return res.status(200).json({
      reply: completion.data.choices[0].message.content
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
