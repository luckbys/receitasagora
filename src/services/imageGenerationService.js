import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const validateImageUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) throw new Error('Imagem indisponível');
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error('URL não é uma imagem válida');
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao validar imagem:', error);
    return false;
  }
};

export const generateRecipeImage = async (recipe) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Extrai palavras-chave do título
    const keywords = recipe.name
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 2)
      .join(' AND ');

    const prompt = `
      Você é um especialista em fotografia culinária procurando a imagem perfeita de "${recipe.name}".
      
      IMPORTANTE: A imagem DEVE mostrar especificamente "${recipe.name}" como prato principal, não apenas ingredientes soltos.
      
      Detalhes da receita para referência:
      - Ingredientes principais: ${recipe.ingredients.join(', ')}
      - Tipo de prato: ${recipe.categories.join(', ')}
      - Modo de preparo: ${recipe.instructions}
      
      Critérios OBRIGATÓRIOS para a foto:
      1. O prato "${recipe.name}" deve ser o elemento central e claramente visível
      2. Ângulo da foto que melhor destaque as características deste prato específico
      3. Iluminação que realce as cores e texturas características de "${recipe.name}"
      4. Composição que transmita o contexto adequado (café da manhã, prato principal, sobremesa, etc.)
      5. Elementos de decoração que complementem "${recipe.name}" sem roubar o foco
      
      Palavras-chave para busca: ${keywords}
      
      Retorne APENAS a URL de uma imagem do Unsplash que mostre exatamente "${recipe.name}".
      A URL deve começar com 'https://images.unsplash.com/' e não deve incluir nenhum texto adicional.
      
      LEMBRE-SE: A imagem deve mostrar "${recipe.name}" pronto para servir, não ingredientes ou pratos similares.
    `;

    // Tenta até 3 vezes gerar uma imagem válida
    for (let tentativa = 0; tentativa < 3; tentativa++) {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const imageUrl = response.text().trim();

      if (!imageUrl.startsWith('https://images.unsplash.com/')) {
        console.log(`Tentativa ${tentativa + 1}: URL inválida`);
        continue;
      }

      const isValid = await validateImageUrl(imageUrl);
      if (isValid) {
        return imageUrl;
      }
      
      console.log(`Tentativa ${tentativa + 1}: Imagem indisponível`);
    }

    throw new Error('Não foi possível gerar uma imagem válida após 3 tentativas');
  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
    // Retorna uma imagem padrão em caso de erro (validada previamente)
    return 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80';
  }
}; 