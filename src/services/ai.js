import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateAIResponse = async (apiKey, messages, appContext) => {
    if (!apiKey) {
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
