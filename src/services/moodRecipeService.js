import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const processAnswersWithAI = async (answers) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Com base nas seguintes respostas de um questionário sobre humor e preferências:
      - Humor atual: ${answers[0]}
      - Experiência desejada: ${answers[1]}
      - Clima: ${answers[2]}
      - Tempo disponível: ${answers[3]}
      - Companhia: ${answers[4]}

      Sugira uma receita específica do nosso catálogo que melhor se adeque a este contexto.
      Considere o estado emocional, o clima e as circunstâncias para fazer uma recomendação personalizada.
      
      Retorne apenas o ID da receita mais adequada (número de 1 a 60).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recipeId = parseInt(response.text().trim());

    return recipeId;
  } catch (error) {
    console.error('Erro ao processar respostas:', error);
    return 1; // ID padrão em caso de erro
  }
}; 