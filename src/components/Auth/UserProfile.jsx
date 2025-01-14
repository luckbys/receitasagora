import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  Divider
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { user, signOut } = useAuth();

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 56, height: 56 }}>
          {user.email[0].toUpperCase()}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Membro desde {new Date(user.created_at).toLocaleDateString()}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="error"
          onClick={signOut}
        >
          Sair
        </Button>
      </Box>
    </Paper>
  );
};

export default UserProfile; 