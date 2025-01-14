import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../services/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Erro ao inicializar auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = {
    user,
    signUp: auth.signUp,
    signIn: auth.signIn,
    signOut: auth.signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 