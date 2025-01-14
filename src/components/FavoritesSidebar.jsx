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
  useMediaQuery,
  Drawer,
  SpeedDial,
  SpeedDialIcon,
  Badge
} from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NoFavorites from './NoFavorites';
import FavoriteRecipeItem from './FavoriteRecipeItem';

const FavoritesSidebar = ({ favorites, recipes, onRemove, onRecipeClick, onMoodQuizClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isExpanded, setIsExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Memoizando a lista de receitas favoritas
  const favoritedRecipes = useMemo(() => 
    recipes.filter(recipe => favorites.includes(recipe.id)),
    [recipes, favorites]
  );

  // Callbacks memorizados para evitar re-renderizações
  const handleToggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleMobileToggle = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const handleRemove = useCallback((id) => {
    onRemove(id);
  }, [onRemove]);

  const handleRecipeClick = useCallback((recipe) => {
    onRecipeClick(recipe);
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [onRecipeClick, isMobile]);

  // Memoizando o conteúdo dos favoritos
  const favoritesContent = useMemo(() => (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ 
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Favoritos ({favoritedRecipes.length})
        </Typography>
        <Tooltip title="Descubra sua Receita Ideal">
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
            <MoodIcon />
          </Fab>
        </Tooltip>
      </Box>
      <Divider />
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
    </Box>
  ), [favoritedRecipes, handleRemove, handleRecipeClick, onMoodQuizClick]);

  // Renderização condicional baseada no dispositivo
  if (isMobile) {
    return (
      <>
        <SpeedDial
          ariaLabel="Favoritos"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            '& .MuiFab-primary': {
              width: 56,
              height: 56,
              background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
              }
            }
          }}
          icon={
            <Badge badgeContent={favoritedRecipes.length} color="error" max={99}>
              <FavoriteIcon />
            </Badge>
          }
          onClick={handleMobileToggle}
        />
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleMobileToggle}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: 360,
              borderRadius: '16px 0 0 16px',
              background: '#fff',
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          {favoritesContent}
        </Drawer>
      </>
    );
  }

  return (
    <Paper 
      elevation={0}
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: isExpanded ? 320 : 60,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderLeft: '1px solid',
        borderColor: 'grey.200',
        transition: 'width 0.3s ease',
        zIndex: theme.zIndex.drawer,
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)'
      }}
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

      {isExpanded ? favoritesContent : (
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