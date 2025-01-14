import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  CardMedia,
  CardActions,
  Grid,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Box,
  Chip,
  Divider,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fab,
  Tooltip,
  Zoom,
  Snackbar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ImageIcon from '@mui/icons-material/Image';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Avatar from '@mui/material/Avatar';
import RecipeSubmissionForm from './components/RecipeSubmissionForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import NoFavorites from './components/NoFavorites';
import FavoritesSidebar from './components/FavoritesSidebar';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import MoodIcon from '@mui/icons-material/Mood';
import MoodQuiz from './components/MoodQuiz';
import ShareIcon from '@mui/icons-material/Share';
import AdUnit from './components/AdUnit';

const initialRecipes = [
  {
    id: 1,
    name: 'Espaguete à Carbonara',
    categories: ['Massa', 'Italiana', 'Principal'],
    ingredients: ['espaguete', 'ovos', 'bacon', 'queijo parmesão', 'pimenta do reino'],
    instructions: 'Cozinhe o espaguete. Misture os ovos, queijo e pimenta. Frite o bacon. Combine tudo.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80',
  },
  {
    id: 2,
    name: 'Frango Mexido',
    categories: ['Frango', 'Mexido', 'Principal'],
    ingredients: ['peito de frango', 'molho de soja', 'brócolis', 'cenouras', 'gengibre'],
    instructions: 'Refogue o frango e os vegetais com molho de soja e gengibre.',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 3,
    name: 'Sopa de Tomate',
    categories: ['Sopa', 'Tomate', 'Principal'],
    ingredients: ['tomates', 'cebola', 'alho', 'caldo de legumes', 'manjericão'],
    instructions: 'Refogue a cebola e o alho. Adicione os tomates e o caldo. Cozinhe e misture. Decore com manjericão.',
    image: 'https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 4,
    name: 'Omelete',
    categories: ['Omelete', 'Principal'],
    ingredients: ['ovos', 'queijo', 'leite', 'sal', 'pimenta'],
    instructions: 'Bata os ovos com leite, sal e pimenta. Cozinhe em uma panela e adicione o queijo.',
    image: 'https://images.unsplash.com/photo-1642484691674-c3801880daf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 5,
    name: 'Sanduíche de Queijo Quente',
    categories: ['Sanduíche', 'Queijo Quente', 'Principal'],
    ingredients: ['pão', 'queijo', 'manteiga'],
    instructions: 'Passe manteiga no pão. Coloque o queijo entre as fatias. Grelhe até dourar.',
    image: 'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 6,
    name: 'Purê de Batata',
    categories: ['Purê', 'Batata', 'Principal'],
    ingredients: ['batatas', 'leite', 'manteiga', 'sal', 'pimenta'],
    instructions: 'Ferva as batatas. Amasse com leite, manteiga, sal e pimenta.',
    image: 'https://images.unsplash.com/photo-1543198126-a8ad7655f77b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 7,
    name: 'Panquecas',
    categories: ['Panquecas', 'Principal'],
    ingredients: ['farinha', 'leite', 'ovos', 'açúcar', 'fermento'],
    instructions: 'Misture todos os ingredientes. Cozinhe em uma chapa até dourar.',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c2475d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 8,
    name: 'Salada',
    categories: ['Salada', 'Principal'],
    ingredients: ['alface', 'tomates', 'pepino', 'molho'],
    instructions: 'Combine todos os ingredientes e adicione o molho.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1772&q=80',
  },
  {
    id: 9,
    name: 'Sanduíche de Pasta de Amendoim',
    categories: ['Sanduíche', 'Pasta de Amendoim', 'Principal'],
    ingredients: ['pão', 'pasta de amendoim', 'geleia'],
    instructions: 'Espalhe pasta de amendoim e geleia nas fatias de pão. Combine.',
    image: 'https://images.unsplash.com/photo-1519492868123-9c70abb2394b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 10,
    name: 'Quesadilla',
    categories: ['Quesadilla', 'Principal'],
    ingredients: ['tortilha', 'queijo'],
    instructions: 'Coloque o queijo na tortilha. Dobre e cozinhe até o queijo derreter.',
    image: 'https://images.unsplash.com/photo-1628824851008-ec3ab4b45edf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 11,
    name: 'Salada Caprese',
    categories: ['Salada', 'Caprese', 'Principal'],
    ingredients: ['tomate', 'mussarela de búfala', 'manjericão', 'azeite', 'sal'],
    instructions: 'Corte o tomate e a mussarela em fatias. Monte com manjericão e tempere com azeite e sal.',
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80',
  },
  {
    id: 12,
    name: 'Wrap de Frango',
    categories: ['Wrap', 'Frango', 'Principal'],
    ingredients: ['tortilha', 'frango grelhado', 'alface', 'tomate', 'molho'],
    instructions: 'Recheie a tortilha com frango, alface, tomate e molho. Enrole e sirva.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80',
  },
  {
    id: 13,
    name: 'Smoothie de Frutas Vermelhas',
    categories: ['Smoothie', 'Frutas Vermelhas', 'Principal'],
    ingredients: ['frutas vermelhas congeladas', 'iogurte', 'mel', 'leite'],
    instructions: 'Bata todos os ingredientes no liquidificador até obter uma mistura homogênea.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80',
  },
  {
    id: 14,
    name: 'Risoto de Cogumelos',
    categories: ['Risoto', 'Italiana', 'Principal'],
    ingredients: ['arroz arbóreo', 'cogumelos', 'cebola', 'vinho branco', 'caldo de legumes', 'queijo parmesão', 'manteiga'],
    instructions: 'Refogue a cebola, adicione o arroz e o vinho. Acrescente o caldo aos poucos, mexendo sempre. Finalize com cogumelos salteados e queijo.',
    image: 'https://images.unsplash.com/photo-1667207393917-ae9aeade6da3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 15,
    name: 'Poke Bowl de Salmão',
    categories: ['Poke', 'Japonesa', 'Principal'],
    ingredients: ['arroz japonês', 'salmão fresco', 'abacate', 'pepino', 'cenoura', 'gergelim', 'molho shoyu'],
    instructions: 'Prepare o arroz. Corte o salmão em cubos. Monte a tigela com arroz, salmão e vegetais. Finalize com gergelim e molho.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 16,
    name: 'Tacos de Carne',
    categories: ['Tacos', 'Mexicana', 'Principal'],
    ingredients: ['tortillas de milho', 'carne moída', 'alface', 'tomate', 'cebola', 'queijo ralado', 'guacamole'],
    instructions: 'Tempere e cozinhe a carne. Aqueça as tortillas. Monte os tacos com carne e acompanhamentos.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 17,
    name: 'Curry de Grão de Bico',
    categories: ['Curry', 'Indiana', 'Vegetariana', 'Principal'],
    ingredients: ['grão de bico', 'leite de coco', 'curry em pó', 'tomate', 'cebola', 'alho', 'gengibre'],
    instructions: 'Refogue os aromáticos, adicione o curry e tomate. Acrescente o grão de bico e leite de coco. Cozinhe até engrossar.',
    image: 'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 18,
    name: 'Bowl de Açaí',
    categories: ['Bowl', 'Sobremesa', 'Café da Manhã'],
    ingredients: ['polpa de açaí', 'banana', 'granola', 'mel', 'morango', 'blueberry', 'coco ralado'],
    instructions: 'Bata o açaí com banana. Coloque em uma tigela e decore com frutas, granola e mel.',
    image: 'https://images.unsplash.com/photo-1590301157898-4810ed352733?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 19,
    name: 'Pad Thai',
    categories: ['Pad Thai', 'Tailandesa', 'Principal'],
    ingredients: ['macarrão de arroz', 'camarão', 'broto de feijão', 'ovo', 'amendoim', 'limão', 'molho de peixe'],
    instructions: 'Cozinhe o macarrão. Frite camarão e ovo. Combine todos os ingredientes com o molho. Finalize com amendoim e limão.',
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 20,
    name: 'Shakshuka',
    categories: ['Shakshuka', 'Árabe', 'Café da Manhã'],
    ingredients: ['ovos', 'tomate', 'pimentão', 'cebola', 'alho', 'cominho', 'páprica'],
    instructions: 'Prepare o molho de tomate com vegetais e especiarias. Faça cavidades e cozinhe os ovos no molho.',
    image: 'https://images.unsplash.com/photo-1590412200988-4810ed352730?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 21,
    name: 'Salada Buddha Bowl',
    categories: ['Buddha Bowl', 'Vegetariana', 'Saudável'],
    ingredients: ['quinoa', 'grão de bico', 'abacate', 'espinafre', 'cenoura', 'beterraba', 'tahine'],
    instructions: 'Cozinhe a quinoa. Prepare os vegetais. Monte a tigela em seções. Finalize com molho de tahine.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 22,
    name: 'Ramen Caseiro',
    categories: ['Ramen', 'Japonesa', 'Principal'],
    ingredients: ['macarrão ramen', 'caldo de frango', 'ovo cozido', 'carne de porco', 'cebolinha', 'broto de bambu', 'nori'],
    instructions: 'Prepare o caldo. Cozinhe o macarrão. Monte a tigela com caldo, macarrão e acompanhamentos.',
    image: 'https://images.unsplash.com/photo-1569718201-2879521b49f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1780&q=80',
  },
  {
    id: 23,
    name: 'Tiramisu',
    categories: ['Tiramisu', 'Italiana', 'Sobremesa'],
    ingredients: ['biscoito champagne', 'café forte', 'queijo mascarpone', 'ovos', 'açúcar', 'cacau em pó'],
    instructions: 'Prepare o creme de mascarpone. Molhe os biscoitos no café. Monte em camadas. Polvilhe cacau.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1772&q=80',
  },
  {
    id: 24,
    name: 'Macarrão com Bacon e Brócolis',
    categories: ['Massa', 'Principal', 'Bacon'],
    ingredients: ['macarrão', 'bacon', 'brócolis', 'alho', 'azeite', 'parmesão', 'pimenta'],
    instructions: 'Cozinhe o macarrão. Frite o bacon até ficar crocante. Refogue o alho e brócolis. Misture tudo e finalize com queijo.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 25,
    name: 'Batata Recheada com Bacon',
    categories: ['Batata', 'Principal', 'Bacon'],
    ingredients: ['batatas grandes', 'bacon', 'queijo cheddar', 'creme de leite', 'cebolinha', 'sal', 'pimenta'],
    instructions: 'Asse as batatas. Frite o bacon. Misture com queijo e creme de leite. Recheie as batatas e gratine.',
    image: 'https://images.unsplash.com/photo-1585438896013-27ab37b2c70b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 26,
    name: 'Salada com Bacon e Abacate',
    categories: ['Salada', 'Principal', 'Bacon'],
    ingredients: ['alface', 'bacon', 'abacate', 'tomate cereja', 'cebola roxa', 'molho ranch', 'croutons'],
    instructions: 'Monte a salada com os ingredientes. Frite o bacon até ficar crocante. Adicione por cima com o molho.',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 27,
    name: 'Quiche de Bacon com Queijo',
    categories: ['Quiche', 'Principal', 'Bacon'],
    ingredients: ['massa de torta', 'bacon', 'queijo', 'ovos', 'creme de leite', 'cebola', 'noz-moscada'],
    instructions: 'Forre a forma com a massa. Frite o bacon. Misture com os demais ingredientes. Asse até dourar.',
    image: 'https://images.unsplash.com/photo-1559717201-2879521b49f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80',
  },
  {
    id: 28,
    name: 'Wrap de Frango com Bacon',
    categories: ['Wrap', 'Principal', 'Bacon'],
    ingredients: ['tortilla', 'peito de frango', 'bacon', 'alface', 'tomate', 'maionese', 'queijo'],
    instructions: 'Grelhe o frango e frite o bacon. Monte o wrap com os ingredientes e enrole.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80',
  },
  {
    id: 29,
    name: 'Risoto de Bacon com Cogumelos',
    categories: ['Risoto', 'Principal', 'Bacon', 'Italiana'],
    ingredients: ['arroz arbóreo', 'bacon', 'cogumelos', 'cebola', 'vinho branco', 'caldo de legumes', 'parmesão'],
    instructions: 'Frite o bacon. Prepare o risoto normalmente, adicionando o bacon e cogumelos no final.',
    image: 'https://images.unsplash.com/photo-1667207393917-ae9aeade6da3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 30,
    name: 'Pizza de Bacon com Ovos',
    categories: ['Pizza', 'Principal', 'Bacon', 'Italiana'],
    ingredients: ['massa de pizza', 'bacon', 'ovos', 'queijo mussarela', 'molho de tomate', 'orégano'],
    instructions: 'Monte a pizza com molho e queijo. Adicione bacon e ovos. Asse até o queijo derreter e os ovos ficarem no ponto.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 31,
    name: 'Hambúrguer com Bacon Crocante',
    categories: ['Hambúrguer', 'Principal', 'Bacon'],
    ingredients: ['pão de hambúrguer', 'hambúrguer', 'bacon', 'queijo cheddar', 'alface', 'tomate', 'maionese'],
    instructions: 'Grelhe o hambúrguer. Frite o bacon até ficar crocante. Monte o sanduíche com todos os ingredientes.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1768&q=80',
  },
  {
    id: 32,
    name: 'Feijão com Bacon',
    categories: ['Feijão', 'Principal', 'Bacon', 'Brasileira'],
    ingredients: ['feijão', 'bacon', 'cebola', 'alho', 'louro', 'sal', 'pimenta'],
    instructions: 'Frite o bacon. Refogue cebola e alho. Adicione o feijão cozido e tempere a gosto.',
    image: 'https://images.unsplash.com/photo-1625535608582-78a7d6298930?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 33,
    name: 'Torta de Batata com Bacon',
    categories: ['Torta', 'Principal', 'Bacon'],
    ingredients: ['batatas', 'bacon', 'leite', 'queijo', 'ovos', 'cebola', 'salsinha'],
    instructions: 'Cozinhe e amasse as batatas. Frite o bacon. Misture todos os ingredientes e asse até dourar.',
    image: 'https://images.unsplash.com/photo-1620894580123-466ad3a0ca06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 34,
    name: 'Lasanha à Bolonhesa',
    categories: ['Massa', 'Italiana', 'Principal'],
    ingredients: ['massa de lasanha', 'carne moída', 'molho de tomate', 'queijo mussarela', 'presunto', 'molho bechamel', 'parmesão'],
    instructions: 'Monte camadas alternando massa, molho à bolonhesa, presunto, queijo e molho bechamel. Finalize com queijo e asse.',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 35,
    name: 'Penne ao Molho Rosa',
    categories: ['Massa', 'Italiana', 'Principal'],
    ingredients: ['penne', 'molho de tomate', 'creme de leite', 'cebola', 'alho', 'manjericão', 'parmesão'],
    instructions: 'Cozinhe o penne. Prepare o molho rosa com molho de tomate e creme de leite. Misture e finalize com manjericão.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 36,
    name: 'Nhoque de Batata',
    categories: ['Massa', 'Italiana', 'Principal'],
    ingredients: ['batatas', 'farinha de trigo', 'ovo', 'sal', 'noz-moscada', 'molho de tomate', 'manjericão'],
    instructions: 'Prepare a massa com batatas cozidas. Modele os nhoques. Cozinhe em água fervente e sirva com molho.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 37,
    name: 'Salada Grega',
    categories: ['Salada', 'Grega', 'Principal'],
    ingredients: ['alface', 'tomate', 'pepino', 'cebola roxa', 'azeitonas pretas', 'queijo feta', 'azeite'],
    instructions: 'Corte os vegetais. Monte a salada. Adicione queijo feta e azeitonas. Tempere com azeite e orégano.',
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 38,
    name: 'Salada Caesar',
    categories: ['Salada', 'Principal'],
    ingredients: ['alface romana', 'frango grelhado', 'croutons', 'parmesão', 'molho caesar', 'anchova', 'limão'],
    instructions: 'Grelhe o frango. Monte a salada com alface. Adicione croutons, parmesão e molho caesar.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 39,
    name: 'Salada de Quinoa',
    categories: ['Salada', 'Vegetariana', 'Principal'],
    ingredients: ['quinoa', 'tomate cereja', 'pepino', 'hortelã', 'amêndoas', 'limão', 'azeite'],
    instructions: 'Cozinhe a quinoa. Misture com os vegetais picados. Adicione amêndoas e tempere com limão e azeite.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 40,
    name: 'Strogonoff de Cogumelos',
    categories: ['Vegetariana', 'Principal'],
    ingredients: ['cogumelos', 'creme de leite', 'cebola', 'alho', 'mostarda', 'ketchup', 'batata palha'],
    instructions: 'Refogue os cogumelos com cebola e alho. Adicione creme de leite e temperos. Sirva com batata palha.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 41,
    name: 'Falafel',
    categories: ['Vegetariana', 'Árabe', 'Principal'],
    ingredients: ['grão de bico', 'cebola', 'alho', 'coentro', 'cominho', 'pimenta', 'farinha'],
    instructions: 'Processe o grão de bico com temperos. Modele as bolinhas e frite até dourar.',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 42,
    name: 'Ratatouille',
    categories: ['Vegetariana', 'Francesa', 'Principal'],
    ingredients: ['berinjela', 'abobrinha', 'tomate', 'pimentão', 'cebola', 'alho', 'ervas'],
    instructions: 'Corte os legumes em rodelas. Monte em camadas. Tempere com ervas e asse.',
    image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 43,
    name: 'Mousse de Chocolate',
    categories: ['Sobremesa', 'Doces'],
    ingredients: ['chocolate meio amargo', 'ovos', 'açúcar', 'creme de leite', 'essência de baunilha'],
    instructions: 'Derreta o chocolate. Bata as claras em neve. Misture delicadamente e leve à geladeira.',
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 44,
    name: 'Pudim de Leite',
    categories: ['Sobremesa', 'Doces', 'Brasileira'],
    ingredients: ['leite condensado', 'leite', 'ovos', 'açúcar para calda'],
    instructions: 'Faça a calda de caramelo. Bata os ingredientes no liquidificador. Asse em banho-maria.',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 45,
    name: 'Cheesecake de Frutas Vermelhas',
    categories: ['Sobremesa', 'Doces'],
    ingredients: ['cream cheese', 'biscoito maisena', 'manteiga', 'açúcar', 'frutas vermelhas', 'gelatina'],
    instructions: 'Prepare a base com biscoitos. Faça o creme de cheese cake. Cubra com calda de frutas.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 46,
    name: 'Sushi de Salmão',
    categories: ['Japonesa', 'Principal'],
    ingredients: ['arroz para sushi', 'salmão fresco', 'nori', 'pepino', 'cream cheese', 'gergelim', 'wasabi'],
    instructions: 'Prepare o arroz. Monte os rolls com salmão e acompanhamentos. Enrole com alga nori.',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 47,
    name: 'Yakisoba',
    categories: ['Japonesa', 'Principal'],
    ingredients: ['macarrão para yakisoba', 'carne', 'repolho', 'cenoura', 'brócolis', 'molho yakisoba', 'óleo'],
    instructions: 'Refogue os legumes e a carne. Adicione o macarrão e o molho. Misture bem.',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 48,
    name: 'Tempurá',
    categories: ['Japonesa', 'Principal'],
    ingredients: ['camarões', 'legumes variados', 'farinha tempurá', 'água gelada', 'óleo para fritura'],
    instructions: 'Prepare a massa tempurá. Passe os ingredientes na massa e frite em óleo quente.',
    image: 'https://images.unsplash.com/photo-1581781870027-04212e231e96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  }
];

const allCategories = [...new Set(initialRecipes.flatMap(recipe => recipe.categories))].sort();

function App() {
  // Estados
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : initialRecipes;
  });
  const [ingredients, setIngredients] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userPhotos, setUserPhotos] = useState(() => {
    const saved = localStorage.getItem('userPhotos');
    return saved ? JSON.parse(saved) : {};
  });
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem('ratings');
    return saved ? JSON.parse(saved) : {};
  });
  const [isMoodQuizOpen, setIsMoodQuizOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareRecipe, setShareRecipe] = useState(null);

  // Effects
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('userPhotos', JSON.stringify(userPhotos));
  }, [userPhotos]);

  useEffect(() => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    // Verifica se há um ID de receita na URL
    const path = window.location.pathname;
    const match = path.match(/\/recipe\/(\d+)/);
    if (match) {
      const recipeId = parseInt(match[1]);
      const recipe = recipes.find(r => r.id === recipeId);
      if (recipe) {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
      }
    }
  }, [recipes]);

  // Handlers
  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSearch = () => {
    const inputIngredients = ingredients
      .toLowerCase()
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const matchedRecipes = recipes.filter((recipe) => {
      const matchesIngredients = inputIngredients.length === 0 || 
      inputIngredients.every((ingredient) =>
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.toLowerCase().includes(ingredient),
          ),
        );

      const matchesCategories = selectedCategories.length === 0 ||
        selectedCategories.some(category => recipe.categories.includes(category));

      return matchesIngredients && matchesCategories;
    });

    setFilteredRecipes(matchedRecipes);
  };

  const toggleFavorite = (recipeId) => {
    setFavorites(prev => 
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const handlePhotoUpload = (recipeId) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhotos(prev => ({
          ...prev,
          [recipeId]: [
            ...(prev[recipeId] || []),
            {
              id: Date.now(),
              url: reader.result,
              userName: 'Usuário',
              date: new Date().toISOString(),
              likes: 0
            }
          ]
        }));
        setSelectedFile(null);
        setIsPhotoModalOpen(false);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePhotoLike = (recipeId, photoId) => {
    setUserPhotos(prev => ({
      ...prev,
      [recipeId]: prev[recipeId].map(photo =>
        photo.id === photoId
          ? { ...photo, likes: photo.likes + 1 }
          : photo
      )
    }));
  };

  const handleRecipeSubmit = (newRecipe) => {
    const updatedRecipes = [...recipes, { ...newRecipe, id: recipes.length + 1 }];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const handleRatingChange = (recipeId, newValue) => {
    setRatings(prev => ({
      ...prev,
      [recipeId]: newValue
    }));
  };

  const handleQuizComplete = (recipeId) => {
    setIsMoodQuizOpen(false);
    const recommendedRecipe = recipes.find(recipe => recipe.id === recipeId);
    if (recommendedRecipe) {
      setSelectedRecipe(recommendedRecipe);
      setIsModalOpen(true);
    }
  };

  const handleShare = (e, recipe) => {
    e.stopPropagation();
    setShareRecipe(recipe);
    setIsShareModalOpen(true);
  };

  const handleCopyLink = () => {
    const recipeUrl = `${window.location.origin}/recipe/${shareRecipe.id}`;
    navigator.clipboard.writeText(recipeUrl);
    setSnackbarOpen(true);
    setIsShareModalOpen(false);
  };

  // Render
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', md: 'calc(100% - 320px)' },
          mr: { md: '320px' },
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: { xs: 2, sm: 4 },
            width: '100%',
            maxWidth: { 
              xs: '100%', 
              md: 'calc(100% - 320px)' 
            },
            pl: { xs: 1, sm: 2, md: 3 },
            pr: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              mb: { xs: 2, sm: 4 }
            }}
          >
            Encontre Receitas Personalizadas
          </Typography>

          <AdUnit slot="1234567890" format="horizontal" />

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: { xs: 2, sm: 4 },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            px: { xs: 2, sm: 0 }
          }}>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => setIsSubmissionFormOpen(true)}
              size="large"
              fullWidth={isMobile}
              sx={{
                borderRadius: { xs: '12px', sm: '8px' },
                py: { xs: 1.5, sm: 1 }
              }}
            >
              Cadastrar Nova Receita
            </Button>
          </Box>

          <Paper sx={{ 
            p: { xs: 2, sm: 3 }, 
            mb: { xs: 2, sm: 4 },
            borderRadius: { xs: 2, sm: 3 }
          }}>
            <Typography variant="h6" gutterBottom>
              Insira seus ingredientes (separados por vírgula):
            </Typography>
            
            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                value={ingredients}
                onChange={handleInputChange}
                placeholder="ex: ovos, queijo, leite"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Accordion 
                elevation={0}
                sx={{ 
                  bgcolor: 'transparent',
                  '&:before': {
                    display: 'none',
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    p: 0,
                    minHeight: 'auto',
                    '& .MuiAccordionSummary-content': {
                      m: 0
                    }
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary"
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <FilterListIcon fontSize="small" />
                    Filtrar por categoria {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pt: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 0.5,
                    maxHeight: '160px',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      bgcolor: 'grey.100',
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      bgcolor: 'grey.300',
                      borderRadius: '4px',
                    },
                  }}>
                    {allCategories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        size="small"
                        onClick={() => {
                          setSelectedCategories(prev => 
                            prev.includes(category)
                              ? prev.filter(c => c !== category)
                              : [...prev, category]
                          );
                        }}
                        color={selectedCategories.includes(category) ? "primary" : "default"}
                        variant={selectedCategories.includes(category) ? "filled" : "outlined"}
                        sx={{ 
                          '&:hover': {
                            bgcolor: theme => selectedCategories.includes(category) 
                              ? 'primary.dark' 
                              : 'action.hover'
                          }
                        }}
                      />
                    ))}
                  </Box>
                  {selectedCategories.length > 0 && (
                    <Button
                      size="small"
                      onClick={() => setSelectedCategories([])}
                      sx={{ mt: 1 }}
                      startIcon={<ClearIcon fontSize="small" />}
                    >
                      Limpar filtros
                    </Button>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>

            <Button 
              variant="contained" 
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              Buscar Receitas
            </Button>
          </Paper>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {filteredRecipes.length > 0 && filteredRecipes.length % 6 === 0 && (
              <Grid item xs={12}>
                <AdUnit slot="0987654321" format="horizontal" />
              </Grid>
            )}
            {filteredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: { xs: '12px', sm: '16px' },
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: { 
                      xs: '0 4px 16px rgba(0, 0, 0, 0.1)',
                      sm: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: { 
                        xs: 'translateY(-4px)',
                        sm: 'perspective(1000px) rotateX(2deg) translateY(-8px)'
                      },
                      boxShadow: { 
                        xs: '0 8px 24px rgba(0, 0, 0, 0.15)',
                        sm: '0 20px 40px rgba(0, 0, 0, 0.2)'
                      },
                    }
                  }}
                  onClick={() => openModal(recipe)}
                >
                  <Box sx={{ 
                    position: 'relative', 
                    height: { xs: '200px', sm: '180px' }
                  }}>
                    <CardMedia
                      component="img"
                      image={recipe.image}
                      alt={recipe.name}
                      sx={{
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        }
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))',
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)',
                        width: 36,
                        height: 36,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(10deg)',
                          bgcolor: 'rgba(255, 255, 255, 1)',
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe.id);
                      }}
                    >
                      {favorites.includes(recipe.id) ? (
                        <FavoriteIcon color="error" fontSize="small" />
                      ) : (
                        <FavoriteBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 56,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)',
                        width: 36,
                        height: 36,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(10deg)',
                          bgcolor: 'rgba(255, 255, 255, 1)',
                        }
                      }}
                      onClick={(e) => handleShare(e, recipe)}
                    >
                      <ShareIcon fontSize="small" color="primary" />
                    </IconButton>
                  </Box>

                  <CardContent 
                    sx={{ 
                      p: 2.5, 
                      flexGrow: 1,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography 
                      variant="h6"
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#1a1a1a',
                        mb: 1.5,
                        lineHeight: 1.2,
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {recipe.name}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Rating
                        name={`rating-${recipe.id}`}
                        value={ratings[recipe.id] || 0}
                        precision={0.5}
                        size="small"
                        onChange={(_, newValue) => handleRatingChange(recipe.id, newValue)}
                        sx={{ 
                          '& .MuiRating-icon': {
                            color: 'primary.main',
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.2)',
                            }
                          }
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '0.75rem',
                          color: 'text.secondary',
                          fontWeight: 500
                        }}
                      >
                        {ratings[recipe.id] ? `${ratings[recipe.id]}/5` : 'Sem avaliação'}
                      </Typography>
                    </Box>

                    <Stack 
                      direction="row" 
                      spacing={0.5} 
                      flexWrap="wrap" 
                      sx={{ gap: 0.5, mb: 2 }}
                    >
                      {recipe.categories.map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          size="small"
                          sx={{ 
                            fontSize: '0.7rem',
                            height: '24px',
                            borderRadius: '12px',
                            bgcolor: 'rgba(0, 0, 0, 0.05)',
                            color: 'text.primary',
                            fontWeight: 500,
                            '&:hover': {
                              bgcolor: 'rgba(0, 0, 0, 0.1)',
                            }
                          }}
                        />
                      ))}
                    </Stack>

                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1,
                      color: 'text.secondary',
                      mt: 'auto'
                    }}>
                      <KitchenIcon sx={{ fontSize: '1rem' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '0.8rem',
                          fontWeight: 500
                        }}
                      >
                        {recipe.ingredients.length} ingredientes
                      </Typography>
                    </Box>
                  </CardContent>

                  <Box 
                    sx={{ 
                      p: 2,
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderTop: '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      size="medium"
                      sx={{
                        textTransform: 'none',
                        borderRadius: '12px',
                        py: 1,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                        }
                      }}
                    >
                      Ver Receita
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Modal usando Dialog do MUI */}
          <Dialog
            open={isModalOpen}
            onClose={closeModal}
            maxWidth="lg"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: { xs: 0, sm: 4 },
                background: '#fff',
                overflow: 'hidden',
                height: { xs: '100%', sm: 'auto' },
                maxHeight: { xs: '100%', sm: '90vh' },
                m: { xs: 0, sm: 2 }
              }
            }}
          >
            {selectedRecipe && (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                height: '100%'
              }}>
                {/* Lado Esquerdo - Imagem e Informações Básicas */}
                <Box sx={{ 
                  width: { xs: '100%', md: '45%' },
                  position: 'relative',
                  bgcolor: '#000',
                  height: { xs: '35vh', md: 'auto' },
                  minHeight: { xs: '250px', md: 'auto' }
                }}>
                  <CardMedia
                    component="img"
                    image={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    sx={{
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.85
                    }}
                  />
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      p: { xs: 2, sm: 4 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.5rem' },
                        mb: { xs: 1, sm: 2 },
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      {selectedRecipe.name}
                    </Typography>

                    <Stack 
                      direction="row" 
                      spacing={{ xs: 2, sm: 3 }} 
                      sx={{ 
                        color: 'white', 
                        mb: { xs: 1, sm: 2 }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <KitchenIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                          }}
                        >
                          {selectedRecipe.ingredients.length} ingredientes
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                          }}
                        >
                          30 min
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack 
                      direction="row" 
                      spacing={1} 
                      sx={{ 
                        flexWrap: 'wrap', 
                        gap: 0.5,
                        display: { xs: 'none', sm: 'flex' }
                      }}
                    >
                      {selectedRecipe.categories.map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.15)',
                            color: 'white',
                            backdropFilter: 'blur(4px)',
                            '& .MuiChip-label': { 
                              fontWeight: 500,
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <IconButton
                    onClick={closeModal}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: 'white',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(4px)',
                      padding: { xs: 1, sm: 1.5 },
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.7)',
                      }
                    }}
                  >
                    <CloseIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                  </IconButton>
                </Box>

                {/* Lado Direito - Conteúdo */}
                <Box sx={{ 
                  width: { xs: '100%', md: '55%' },
                  display: 'flex',
                  flexDirection: 'column',
                  height: { xs: 'calc(65vh - 56px)', md: 'auto' },
                  overflow: 'hidden'
                }}>
                  {/* Categorias para mobile */}
                  <Box sx={{ 
                    display: { xs: 'flex', sm: 'none' },
                    p: 2,
                    pb: 1,
                    gap: 0.5,
                    flexWrap: 'wrap'
                  }}>
                    {selectedRecipe.categories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        size="small"
                        sx={{ 
                          bgcolor: 'grey.100',
                          fontSize: '0.7rem'
                        }}
                      />
                    ))}
                  </Box>

                  {/* Área scrollável */}
                  <Box 
                    sx={{ 
                      flex: 1,
                      overflowY: 'auto',
                      p: { xs: 2, sm: 4 },
                      '&::-webkit-scrollbar': {
                        width: '4px',
                      },
                      '&::-webkit-scrollbar-track': {
                        bgcolor: 'grey.100',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        bgcolor: 'grey.400',
                        borderRadius: '4px',
                        '&:hover': {
                          bgcolor: 'grey.500',
                        }
                      },
                    }}
                  >
                    {/* Seção de Ingredientes */}
                    <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: { xs: 2, sm: 3 },
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: 'primary.main',
                          fontWeight: 600,
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                      >
                        <KitchenIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                        Ingredientes
                      </Typography>
                      <Stack spacing={1}>
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              p: { xs: 1.5, sm: 2 },
                              borderRadius: 2,
                              bgcolor: 'grey.50',
                              '&:hover': {
                                transform: 'translateX(8px)',
                                bgcolor: 'grey.100'
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <LocalDiningIcon 
                              sx={{ 
                                color: 'primary.main', 
                                opacity: 0.7,
                                fontSize: { xs: '1rem', sm: '1.25rem' }
                              }} 
                            />
                            <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                              {ingredient}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                    {/* Seção de Modo de Preparo */}
                    <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: { xs: 2, sm: 3 },
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: 'primary.main',
                          fontWeight: 600,
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                      >
                        <RestaurantIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                        Modo de Preparo
                      </Typography>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: { xs: 2, sm: 3 }, 
                          bgcolor: 'grey.50', 
                          borderRadius: 3,
                          whiteSpace: 'pre-line'
                        }}
                      >
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            lineHeight: 1.8,
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                          }}
                        >
                          {selectedRecipe.instructions}
                        </Typography>
                      </Paper>
                    </Box>

                    {/* Seção de Fotos */}
                    <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        mb: { xs: 2, sm: 3 }
                      }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: 'primary.main',
                            fontWeight: 600,
                            fontSize: { xs: '1.1rem', sm: '1.25rem' }
                          }}
                        >
                          <ImageIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                          Fotos da Comunidade
                        </Typography>
                        <Button
                          startIcon={<AddAPhotoIcon />}
                          onClick={() => setIsPhotoModalOpen(true)}
                          variant="outlined"
                          size="small"
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            py: { xs: 0.5, sm: 1 }
                          }}
                        >
                          Adicionar Foto
                        </Button>
                      </Box>
                    </Box>
                  </Box>

                  {/* Footer fixo */}
                  <Box sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    borderTop: '1px solid',
                    borderColor: 'grey.200',
                    bgcolor: 'grey.50',
                    mt: 'auto'
                  }}>
                    <Button
                      variant="contained"
                      startIcon={favorites.includes(selectedRecipe.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      onClick={() => toggleFavorite(selectedRecipe.id)}
                      color={favorites.includes(selectedRecipe.id) ? "error" : "primary"}
                      fullWidth
                      sx={{
                        py: { xs: 1, sm: 1.5 },
                        borderRadius: 3,
                        boxShadow: 'none',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        '&:hover': {
                          boxShadow: 'none',
                          bgcolor: favorites.includes(selectedRecipe.id) ? 'error.dark' : 'primary.dark'
                        }
                      }}
                    >
                      {favorites.includes(selectedRecipe.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Dialog>
        </Container>
      </Box>

      <FavoritesSidebar
        favorites={favorites}
        recipes={recipes}
        onRemove={toggleFavorite}
        onRecipeClick={openModal}
        onMoodQuizClick={() => setIsMoodQuizOpen(true)}
      />

      <Dialog
        open={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Compartilhar Foto
          </Typography>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'grey.300',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main'
              }
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
              <Box>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Clique para escolher outra foto
                </Typography>
              </Box>
            ) : (
              <>
                <AddAPhotoIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                <Typography>
                  Clique para selecionar uma foto
                </Typography>
              </>
            )}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPhotoModalOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => handlePhotoUpload(selectedRecipe.id)}
            disabled={!selectedFile}
          >
            Compartilhar
          </Button>
        </DialogActions>
      </Dialog>

      <RecipeSubmissionForm
        open={isSubmissionFormOpen}
        onClose={() => setIsSubmissionFormOpen(false)}
        onSubmit={handleRecipeSubmit}
        allCategories={allCategories}
      />

      <MoodQuiz
        open={isMoodQuizOpen}
        onClose={() => setIsMoodQuizOpen(false)}
        onComplete={handleQuizComplete}
      />

      <Dialog
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: '#fff',
            overflow: 'hidden'
          }
        }}
      >
        {shareRecipe && (
          <>
            <Box sx={{ 
              position: 'relative',
              height: '200px',
              bgcolor: '#000'
            }}>
              <CardMedia
                component="img"
                image={shareRecipe.image}
                alt={shareRecipe.name}
                sx={{
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.85
                }}
              />
              
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {shareRecipe.name}
                </Typography>
              </Box>

              <IconButton
                onClick={() => setIsShareModalOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(4px)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.7)',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Compartilhar Receita
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  bgcolor: 'grey.50'
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    color: 'text.secondary',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                  }}
                >
                  {`${window.location.origin}/recipe/${shareRecipe.id}`}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleCopyLink}
                  startIcon={<ShareIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Copiar Link
                </Button>
              </Paper>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Compartilhe esta deliciosa receita com seus amigos e família!
              </Typography>
            </Box>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copiado para a área de transferência!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

export default App;
