import React, { createContext, useState, useEffect } from 'react';

import apiAuth from '../api/apiAuth'; // Путь должен быть правильным в зависимости от вашей структуры папок

// Создаём контекст
export const AuthContext = createContext();

// Провайдер для AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверка авторизации при монтировании
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiAuth.getCurrentUser(token)
        .then(response => {
          login(response.data, token); // Use response.data
        })
        .catch(err => {
          console.log('Ошибка при проверке токена:', err);
          localStorage.removeItem('token'); // Clear invalid token
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  

  // Функция для логина
  const login = (token) => {
    localStorage.setItem('token', token);
    apiAuth
      .getCurrentUser(token)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Ошибка авторизации', error);
      });
  };

  // Функция для логаута
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
