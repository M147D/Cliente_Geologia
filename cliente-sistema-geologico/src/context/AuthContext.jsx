import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../hooks/axiosConfig.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {        
        const response = await api.get('auth/current-user');        
        setUser(response.data.user);
      } catch (error) {
        console.error('Error en verificación de autenticación:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  const login = async (token) => {
    try {
      const { data } = await api.post('auth/login/google', { token });
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};