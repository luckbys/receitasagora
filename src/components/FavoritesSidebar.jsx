import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  Paper,
  Fab,
  Tooltip,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NoFavorites from './NoFavorites';
import FavoriteRecipeItem from './FavoriteRecipeItem';

const FavoritesSidebar = ({ favorites, recipes, onRemove, onRecipeClick, onMoodQuizClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Memoizando a lista de receitas favoritas
  const favoritedRecipes = useMemo(() => 
    recipes.filter(recipe => favorites.includes(recipe.id)),
    [recipes, favorites]
  );

  // Callbacks memorizados para evitar re-renderizações
  const handleToggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleRemove = useCallback((id) => {
    onRemove(id);
  }, [onRemove]);

  const handleRecipeClick = useCallback((recipe) => {
    onRecipeClick(recipe);
  }, [onRecipeClick]);

  // Memoizando o cabeçalho para evitar re-renderizações desnecessárias
  const headerContent = useMemo(() => (
    <Box sx={{ 
      p: isExpanded ? 3 : 1.5, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2, 
      flexShrink: 0,
      alignItems: isExpanded ? 'flex-start' : 'center'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isExpanded ? 'space-between' : 'center',
        width: '100%'
      }}>
        {isExpanded && (
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            Favoritos
          </Typography>
        )}
        <Tooltip title="Descubra sua Receita Ideal" placement="left">
          <Fab
            size="small"
            onClick={onMoodQuizClick}
            sx={{
              background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
              boxShadow: '0 3px 15px rgba(255, 107, 107, 0.5)',
              minWidth: 40,
              width: 40,
              height: 40,
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
      {isExpanded && <Divider sx={{ width: '100%' }} />}
    </Box>
  ), [isExpanded, onMoodQuizClick]);

  // Memoizando os estilos do container para evitar recálculos
  const containerStyles = useMemo(() => ({
    position: 'fixed',
    right: 0,
    top: 0,
    bottom: 0,
    width: isExpanded ? 320 : 60,
    borderRadius: 0,
    display: { xs: 'none', md: 'flex' },
    flexDirection: 'column',
    bgcolor: 'background.paper',
    borderLeft: '1px solid',
    borderColor: 'grey.200',
    transition: 'width 0.3s ease',
    zIndex: theme.zIndex.drawer,
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)'
  }), [isExpanded]);

  return (
    <Paper 
      elevation={0}
      sx={containerStyles}
    >
      <IconButton
        onClick={handleToggleExpand}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          borderRadius: '0 8px 8px 0',
          boxShadow: 2,
          '&:hover': {
            bgcolor: 'grey.100',
          },
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        {isExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>

      {headerContent}

      {isExpanded ? (
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto',
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
          {favoritedRecipes.length === 0 ? (
            <NoFavorites />
          ) : (
            <List>
              {favoritedRecipes.map((recipe) => (
                <FavoriteRecipeItem
                  key={recipe.id}
                  recipe={recipe}
                  onRemove={handleRemove}
                  onClick={handleRecipeClick}
                />
              ))}
            </List>
          )}
        </Box>
      ) : (
        <Box sx={{ 
          flex: 1,
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2,
          mt: 2,
          overflowY: 'auto',
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
            <Tooltip 
              key={recipe.id} 
              title={recipe.name}
              placement="left"
            >
              <Avatar
                src={recipe.image}
                alt={recipe.name}
                sx={{
                  width: 40,
                  height: 40,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }
                }}
                onClick={() => handleRecipeClick(recipe)}
              />
            </Tooltip>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default FavoritesSidebar; 