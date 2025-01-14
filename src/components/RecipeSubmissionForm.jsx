import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Chip,
  Stack,
  Autocomplete
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';

const RecipeSubmissionForm = ({ open, onClose, onSubmit, allCategories }) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    categories: [],
    image: null
  });
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    // Aqui você pode adicionar validação
    onSubmit({
      ...formData,
      id: Date.now(), // ID temporário
      ingredients: formData.ingredients.split(',').map(i => i.trim()),
      image: formData.image ? URL.createObjectURL(formData.image) : ''
    });
    onClose();
    setFormData({
      name: '',
      ingredients: '',
      instructions: '',
      categories: [],
      image: null
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adicionar Nova Receita</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Área de upload de imagem */}
          <Box
            sx={{
              position: 'relative',
              border: '2px dashed',
              borderColor: 'grey.300',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              mb: 3,
              '&:hover': {
                borderColor: 'primary.main'
              }
            }}
            onClick={() => !formData.image && fileInputRef.current?.click()}
          >
            {formData.image ? (
              <Box sx={{ position: 'relative' }}>
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '200px', 
                    objectFit: 'contain' 
                  }}
                />
                {/* Botão de remoção sobreposto */}
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: -12,
                    bgcolor: 'error.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'error.dark'
                    },
                    boxShadow: 2
                  }}
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <>
                <AddAPhotoIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                <Typography>
                  Clique para adicionar uma foto
                </Typography>
              </>
            )}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageSelect}
            />
          </Box>

          {/* Campos do formulário */}
          <TextField
            fullWidth
            label="Nome da Receita"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Ingredientes (separados por vírgula)"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Instruções"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />
          <Autocomplete
            multiple
            options={allCategories}
            value={formData.categories}
            onChange={(_, newValue) => {
              setFormData(prev => ({ ...prev, categories: newValue }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categorias"
                margin="normal"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={!formData.name || !formData.ingredients || !formData.instructions}
        >
          Adicionar Receita
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeSubmissionForm; 