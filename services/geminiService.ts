import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    // In a real app, strict error handling for missing key is needed.
    // Assuming process.env.API_KEY is available as per instructions.
    client = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return client;
};

export const generateExplanation = async (organelleName: string, query: string): Promise<string> => {
  try {
    const ai = getClient();
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      你是一位风趣幽默的中学生物老师。
      学生正在学习“${organelleName}”。
      学生的问题是：${query}
      
      请用通俗易懂、生动形象的语言回答，可以适当使用比喻。
      回答长度控制在150字以内。
      如果学生要求出题，请出一个相关的选择题。
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "抱歉，AI 老师正在思考中，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "网络连接出现问题，请检查 API Key 配置。";
  }
};