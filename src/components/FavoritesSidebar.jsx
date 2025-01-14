import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Chip,
  Stack,
  Divider,
  Badge,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Paper,
  Fab,
  Tooltip,
  Zoom
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoodIcon from '@mui/icons-material/Mood';
import NoFavorites from './NoFavorites';

const FavoritesSidebar = ({ favorites, recipes, onRemove, onRecipeClick, onMoodQuizClick }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const favoritedRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <Paper
      sx={{
        width: 320,
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: 0,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        bgcolor: 'grey.50',
        borderLeft: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Favoritos
          </Typography>
          <Tooltip title="Descubra sua Receita Ideal" placement="left">
            <Fab
              size="small"
              onClick={onMoodQuizClick}
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                boxShadow: '0 3px 15px rgba(255, 107, 107, 0.5)',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    boxShadow: '0 3px 15px rgba(255, 107, 107, 0.5)',
                  },
                  '50%': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 5px 20px rgba(255, 107, 107, 0.7)',
                  },
                  '100%': {
                    transform: 'scale(1)',
                    boxShadow: '0 3px 15px rgba(255, 107, 107, 0.5)',
                  }
                },
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                  transform: 'rotate(360deg) scale(1.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }
              }}
            >
              <MoodIcon sx={{ 
                fontSize: '1.5rem',
                animation: 'sparkle 1.5s infinite',
                '@keyframes sparkle': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.7 },
                  '100%': { opacity: 1 }
                }
              }} />
            </Fab>
          </Tooltip>
        </Box>
        <Divider />
      </Box>

      {favoritedRecipes.length === 0 ? (
        <NoFavorites />
      ) : (
        <List sx={{ 
          overflowY: 'auto',
          flex: 1,
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'grey.100',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'grey.400',
            borderRadius: '4px',
          },
        }}>
          {favoritedRecipes.map((recipe) => (
            <ListItem
              key={recipe.id}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={() => onRemove(recipe.id)}
                  sx={{
                    '&:hover': {
                      color: 'error.main',
                    },
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              }
              onClick={() => onRecipeClick(recipe)}
            >
              <ListItemText
                primary={recipe.name}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 500,
                    fontSize: '0.95rem',
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default FavoritesSidebar; 