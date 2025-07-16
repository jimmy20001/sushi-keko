import { User, AIRecommendation, Language, MenuItem } from '../types';

// This function now securely communicates with our backend proxy
// instead of directly with the Gemini API.
export const getSushiRecommendation = async (
    preference: string, 
    user: User, 
    language: Language,
    menu: MenuItem[] // Pass the full menu to the backend
): Promise<AIRecommendation> => {
    try {
        const response = await fetch('/api/ai/recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ preference, user, language, menu }),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error("Error from backend proxy:", errorBody);
            throw new Error(errorBody.error || "Failed to get recommendation.");
        }

        return await response.json();

    } catch (error) {
        console.error("Error fetching recommendation from backend service:", error);
        // Re-throw the error so the UI component can handle it
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unknown error occurred while fetching the recommendation.");
    }
};