# Aplicativo de Receitas Personalizadas

Um aplicativo web moderno para descobrir e compartilhar receitas, construído com React e Material-UI.

## Funcionalidades

- 🔍 Busca de receitas por ingredientes
- 📝 Cadastro de novas receitas
- ❤️ Sistema de favoritos
- 🌟 Avaliações com estrelas
- 📸 Compartilhamento de fotos da comunidade
- 🎯 Quiz de humor para recomendação personalizada
- 🔗 Compartilhamento de receitas via link

## Tecnologias Utilizadas

- React
- Vite
- Material-UI
- React Router
- Google AI (para recomendações personalizadas)

## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione sua chave da API do Google AI:
     ```
     VITE_GEMINI_API_KEY=sua_chave_aqui
     ```
4. Execute o projeto:
   ```bash
   npm run dev
   ```

## Estrutura do Projeto

- `/src` - Código fonte do projeto
  - `/components` - Componentes React reutilizáveis
  - `/services` - Serviços e integrações
  - `App.jsx` - Componente principal
  - `main.jsx` - Ponto de entrada da aplicação

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 