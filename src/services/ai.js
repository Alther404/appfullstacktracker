import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateAIResponse = async (apiKey, messages, appContext) => {
    if (!apiKey) {
        throw new Error("API Key is missing");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

    const systemPrompt = `
You are an AI Assistant for a "DevJourney" productivity app.
Your goal is to help the user become a better developer and stay productive.
You have access to the user's current context:
- Level: ${appContext.stats.level} (${appContext.levelTitle})
- XP: ${appContext.stats.xp}
- Current Streak: ${appContext.stats.streak} days
- Active Tasks: ${appContext.tasks.filter(t => t.status !== 'done').map(t => t.title).join(', ') || 'None'}
- Recent Notes: ${appContext.notes.slice(0, 200)}...

Keep your responses concise, encouraging, and helpful. 
If the user asks for code, provide it.
If the user seems stuck, suggest breaking down tasks.
`;

    try {
        const result = await model.generateContent({
            contents: [
                { role: 'user', parts: [{ text: systemPrompt + "\n\nUser's latest message: " + messages[messages.length - 1].content }] }
            ]
        });
        return result.response.text();
    } catch (error) {
        console.error("AI Error:", error);
        throw error;
    }
};
