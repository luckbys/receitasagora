import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const NoFavorites = () => {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: 'center',
        bgcolor: 'grey.50',
        borderRadius: 2,
        border: '1px dashed',
        borderColor: 'grey.300'
      }}
    >
      <FavoriteBorderIcon 
        sx={{ 
          fontSize: 64, 
          color: 'grey.400',
          mb: 2
        }} 
      />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Nenhuma receita favorita ainda
      </Typography>
      <Typography color="text.secondary">
        Clique no coração nas receitas que você mais gosta para salvá-las aqui!
      </Typography>
    </Paper>
  );
};

export default NoFavorites; 