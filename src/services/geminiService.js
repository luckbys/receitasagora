const API_KEY = "AIzaSyCb02UOLsV2yiZNq9FK-zZcIdp9KCn91AA";

export const validateRecipeWithAI = async (recipe) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `
                Analise esta receita e verifique se ela é válida e segura.
                Responda APENAS em formato JSON válido.

                Receita:
                {
                  "nome": "${recipe.name}",
                  "ingredientes": "${recipe.ingredients.join(', ')}",
                  "instruções": "${recipe.instructions}"
                }

                Avalie:
                1. Ingredientes suficientes para instruções
                2. Clareza e completude das instruções
                3. Riscos de segurança alimentar
                4. Proporções corretas
                5. Executabilidade da receita

                Responda exatamente neste formato, sem incluir marcadores de código:
                {
                  "isValid": boolean,
                  "message": "string",
                  "suggestions": ["string"]
                }
              `
            }]
          }]
        })
      }
    );

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const text = data.candidates[0].content.parts[0].text;
    
    try {
      const cleanText = text.replace(/```json\n|\n```|```/g, '').trim();
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("Erro ao fazer parse do JSON:", error, "Texto recebido:", text);
      return {
        isValid: false,
        message: "Não foi possível validar a receita. Por favor, verifique os dados e tente novamente.",
        suggestions: ["Verifique se todos os campos estão preenchidos corretamente"]
      };
    }
  } catch (error) {
    console.error("Erro ao validar receita:", error);
    return {
      isValid: false,
      message: "Erro ao conectar com o serviço de validação. Por favor, tente novamente mais tarde.",
      suggestions: ["Tente novamente em alguns instantes"]
    };
  }
}; 