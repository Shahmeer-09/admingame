import React, { createContext, useContext, useState } from 'react';
import { createAuthState } from '../types/user.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(createAuthState());

  const login = (user, isAdmin = false) => {
    setAuth({
      user,
      isAuthenticated: true,
      isAdmin,
    });
  };

  const logout = () => {
    setAuth(createAuthState());
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};