import React from 'react';
import { CardMedia } from '@mui/material';

const RecipeImage = ({ src, alt }) => {
  return (
    <CardMedia
      component="img"
      height="200"
      image={src}
      alt={alt}
      sx={{
        objectFit: 'cover',
      }}
    />
  );
};

export default RecipeImage; 