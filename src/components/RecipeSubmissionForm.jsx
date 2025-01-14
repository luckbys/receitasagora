import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { generateRecipeImage } from '../services/imageGenerationService';

const RecipeSubmissionForm = ({ open, onClose, onSubmit, allCategories }) => {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    categories: [],
    image: ''
  });
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState('');
  const [imageStatus, setImageStatus] = useState('');

  const handleChange = (field) => (event) => {
    setRecipe({ ...recipe, [field]: event.target.value });
  };

  const handleCategoryToggle = (category) => {
    setRecipe(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleGenerateImage = async () => {
    if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
      setError('Preencha todos os campos antes de gerar a imagem');
      return;
    }

    setIsGeneratingImage(true);
    setError('');
    setImageStatus('Gerando imagem...');

    try {
      const imageUrl = await generateRecipeImage({
        ...recipe,
        ingredients: recipe.ingredients.split(',').map(i => i.trim())
      });

      if (imageUrl) {
        setRecipe(prev => ({ ...prev, image: imageUrl }));
        setImageStatus('Imagem gerada com sucesso!');
      } else {
        setError('Não foi possível gerar a imagem. Tente novamente.');
        setImageStatus('');
      }
    } catch (err) {
      setError('Erro ao gerar imagem: ' + err.message);
      setImageStatus('');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSubmit = () => {
    if (!recipe.name || !recipe.ingredients || !recipe.instructions || recipe.categories.length === 0) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    onSubmit({
      ...recipe,
      ingredients: recipe.ingredients.split(',').map(i => i.trim())
    });
    
    setRecipe({
      name: '',
      ingredients: '',
      instructions: '',
      categories: [],
      image: ''
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cadastrar Nova Receita</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Nome da Receita"
            value={recipe.name}
            onChange={handleChange('name')}
            fullWidth
            required
          />

          <TextField
            label="Ingredientes (separados por vírgula)"
            value={recipe.ingredients}
            onChange={handleChange('ingredients')}
            fullWidth
            multiline
            rows={3}
            required
          />

          <TextField
            label="Modo de Preparo"
            value={recipe.instructions}
            onChange={handleChange('instructions')}
            fullWidth
            multiline
            rows={4}
            required
          />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Categorias
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {allCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => handleCategoryToggle(category)}
                  color={recipe.categories.includes(category) ? "primary" : "default"}
                  variant={recipe.categories.includes(category) ? "filled" : "outlined"}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              onClick={handleGenerateImage}
              disabled={isGeneratingImage}
              startIcon={isGeneratingImage ? <CircularProgress size={20} /> : null}
            >
              {isGeneratingImage ? 'Gerando Imagem...' : recipe.image ? 'Gerar Nova Imagem' : 'Gerar Imagem com IA'}
            </Button>
            {imageStatus && (
              <Typography 
                variant="body2" 
                color={error ? "error.main" : "success.main"}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  animation: error ? 'none' : 'fadeIn 0.5s ease-in'
                }}
              >
                {error ? '❌' : '✓'} {imageStatus}
                {recipe.image && !isGeneratingImage && !error && (
                  <Button
                    size="small"
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage}
                    sx={{ minWidth: 'auto', p: 0.5 }}
                  >
                    🔄
                  </Button>
                )}
              </Typography>
            )}
          </Box>

          {recipe.image && (
            <Box 
              sx={{ 
                mt: 2, 
                position: 'relative',
                '&::after': error ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  borderRadius: 2
                } : {}
              }}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{
                  width: '100%',
                  height: 250,
                  objectFit: 'cover',
                  borderRadius: 8
                }}
                onError={() => {
                  setError('A imagem não pode ser carregada. Tente gerar novamente.');
                  setImageStatus('');
                }}
              />
              <Box 
                sx={{ 
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  borderRadius: 1,
                  p: 0.5
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  sx={{ minWidth: 'auto', p: 1 }}
                >
                  {isGeneratingImage ? <CircularProgress size={20} /> : '🔄 Nova Imagem'}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={isGeneratingImage}
        >
          Cadastrar Receita
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeSubmissionForm; 