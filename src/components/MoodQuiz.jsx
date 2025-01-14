import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MoodIcon from '@mui/icons-material/Mood';
import { processAnswersWithAI } from '../services/moodRecipeService';

const questions = [
  {
    id: 1,
    question: "Como você está se sentindo hoje?",
    options: [
      { value: "energetic", label: "Energético e animado" },
      { value: "relaxed", label: "Relaxado e tranquilo" },
      { value: "stressed", label: "Estressado" },
      { value: "tired", label: "Cansado" }
    ]
  },
  {
    id: 2,
    question: "Que tipo de experiência você busca agora?",
    options: [
      { value: "comfort", label: "Conforto e aconchego" },
      { value: "healthy", label: "Algo saudável" },
      { value: "indulgent", label: "Uma indulgência" },
      { value: "adventure", label: "Uma aventura culinária" }
    ]
  },
  {
    id: 3,
    question: "Como está o clima hoje?",
    options: [
      { value: "hot", label: "Quente" },
      { value: "cold", label: "Frio" },
      { value: "mild", label: "Ameno" },
      { value: "rainy", label: "Chuvoso" }
    ]
  },
  {
    id: 4,
    question: "Quanto tempo você tem disponível?",
    options: [
      { value: "quick", label: "Pouco tempo (até 30min)" },
      { value: "medium", label: "Tempo médio (até 1h)" },
      { value: "lots", label: "Bastante tempo (mais de 1h)" },
      { value: "noLimit", label: "Sem pressa" }
    ]
  },
  {
    id: 5,
    question: "Com quem você vai compartilhar esta refeição?",
    options: [
      { value: "alone", label: "Sozinho" },
      { value: "family", label: "Família" },
      { value: "friends", label: "Amigos" },
      { value: "partner", label: "Parceiro(a)" }
    ]
  }
];

const MoodQuiz = ({ open, onClose, onComplete }) => {
  const theme = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState('');

  const handleAnswer = () => {
    const newAnswers = { ...answers, [currentQuestion]: selectedOption };
    setAnswers(newAnswers);

    if (currentQuestion === questions.length - 1) {
      handleComplete(newAnswers);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    }
  };

  const handleComplete = async (finalAnswers) => {
    try {
      const result = await processAnswersWithAI(finalAnswers);
      onComplete(result);
    } catch (error) {
      console.error('Erro ao processar respostas:', error);
      onComplete(1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        pb: 0
      }}>
        <MoodIcon color="primary" />
        <Typography variant="h5" component="span" fontWeight={600}>
          Descubra sua Receita Ideal
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress}
            sx={{ 
              height: 8, 
              borderRadius: 4,
              mb: 4
            }} 
          />

          <Typography variant="h6" gutterBottom>
            {questions[currentQuestion].question}
          </Typography>

          <RadioGroup
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            sx={{ my: 3 }}
          >
            <Stack spacing={2}>
              {questions[currentQuestion].options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  sx={{
                    bgcolor: 'background.paper',
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: selectedOption === option.value ? 'primary.main' : 'divider',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    }
                  }}
                />
              ))}
            </Stack>
          </RadioGroup>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAnswer}
              variant="contained"
              disabled={!selectedOption}
              endIcon={<RestaurantIcon />}
              sx={{ borderRadius: 2 }}
            >
              {currentQuestion === questions.length - 1 ? 'Descobrir Receita' : 'Próxima'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MoodQuiz; 