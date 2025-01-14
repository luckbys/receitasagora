import React, { memo } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const FavoriteRecipeItem = memo(({ recipe, onRemove, onClick }) => {
  return (
    <ListItem
      sx={{
        cursor: 'pointer',
        borderRadius: 2,
        mb: 1,
        mx: 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: 'grey.100',
          transform: 'translateX(8px)',
        },
      }}
      secondaryAction={
        <IconButton 
          edge="end" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(recipe.id);
          }}
          sx={{
            opacity: 0,
            transition: 'opacity 0.2s',
            '&:hover': {
              color: 'error.main',
            },
            '.MuiListItem-root:hover &': {
              opacity: 1,
            }
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      }
      onClick={() => onClick(recipe)}
    >
      <ListItemAvatar>
        <Avatar
          src={recipe.image}
          alt={recipe.name}
          variant="rounded"
          sx={{ 
            width: 48, 
            height: 48,
            borderRadius: 2,
            mr: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <RestaurantIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={recipe.name}
        secondary={recipe.categories.join(' • ')}
        primaryTypographyProps={{
          sx: {
            fontWeight: 500,
            fontSize: '0.95rem',
            color: 'text.primary',
          }
        }}
        secondaryTypographyProps={{
          sx: {
            fontSize: '0.75rem',
            color: 'text.secondary',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        }}
      />
    </ListItem>
  );
});

FavoriteRecipeItem.displayName = 'FavoriteRecipeItem';

export default FavoriteRecipeItem; 