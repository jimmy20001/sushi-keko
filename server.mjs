import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import 'dotenv/config';

// Basic server setup
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

// Securely initialize Gemini AI on the server
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    console.error("CRITICAL: GEMINI_API_KEY environment variable is not set.");
    process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: geminiApiKey });
const model = "gemini-2.5-flash";

// Define the schema for the AI response to ensure consistent output
const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
        recommendation: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "The name of the recommended sushi set from the menu (in Polish)." },
                description: { type: Type.STRING, description: "An exciting and appetizing description of the sushi recommendation in the user's language." },
            },
            required: ["name", "description"]
        },
        pairing: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "The name of the recommended drink pairing in the user's language." },
                description: { type: Type.STRING, description: "A brief explanation of why this drink pairs well with the sushi in the user's language." },
            },
            required: ["name", "description"]
        }
    },
    required: ["recommendation", "pairing"]
};

// The single, secure backend endpoint to proxy requests to the Gemini API
app.post('/api/ai/recommendation', async (req, res) => {
    const { preference, user, language, menu } = req.body;

    if (!preference || !user || !language || !menu) {
        return res.status(400).json({ error: 'Missing required fields: preference, user, language, and menu are required.' });
    }

    try {
        const userHistory = menu.filter(item => user.purchaseHistory.includes(item.id))
            .map(item => item.name.pl)
            .join(', ') || 'brak';

        const menuJSON = JSON.stringify(menu.map(item => ({
            id: item.id,
            category: item.category.pl,
            name: item.name.pl,
            description: item.description.pl,
            isVegan: item.isVegan
        })));

        const prompt = `
      Jesteś ekspertem sommelierem sushi dla 'Sushi Keko', firmy z automatami z sushi premium. Użytkownik prosi o rekomendację w języku ${language === 'pl' ? 'polskim' : 'angielskim'}.
      Jego preferencja to: "${preference}".
      Historia zakupów użytkownika: ${userHistory}. Priorytetem jest polecenie czegoś, czego jeszcze nie próbował.
      Nasze pełne menu (w języku polskim) jest dostępne w formacie JSON: ${menuJSON}.
      
      Twoje zadanie:
      1. Wybierz JEDEN zestaw sushi z menu, który najlepiej pasuje do preferencji użytkownika i, jeśli to możliwe, nie znajduje się w jego historii zakupów. Nazwa zestawu w odpowiedzi musi być DOKŁADNIE taka sama jak w menu.
      2. Napisz ekscytujący i apetyczny opis (w języku ${language === 'pl' ? 'polskim' : 'angielskim'}), dlaczego jest to dla niego świetny wybór.
      3. Zaproponuj jeden napój (np. Zielona Herbata, Soda Yuzu, Woda), który idealnie by się z nim komponował i wyjaśnij dlaczego (również w języku ${language === 'pl' ? 'polskim' : 'angielskim'}).
      
      MUSISZ odpowiedzieć TYLKO obiektem JSON. Nie dodawaj żadnego tekstu przed ani po obiekcie JSON.
    `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationSchema,
                temperature: 0.8,
                thinkingConfig: { thinkingBudget: 0 }
            },
        });

        const jsonText = response.text.trim();
        if (!jsonText) {
            throw new Error("Received empty response from AI.");
        }

        res.status(200).json(JSON.parse(jsonText));

    } catch (error) {
        console.error('Error proxying request to Gemini API:', error);
        res.status(500).json({ error: 'Failed to get recommendation from the AI service.' });
    }
});

app.listen(port, () => {
    console.log(`Sushi Keko server listening on port ${port}`);
});