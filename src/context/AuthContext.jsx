import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in on app start
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication - replace with real API call
    if (email === 'admin@example.com' && password === 'admin123') {
      const adminData = {
        id: '1',
        name: 'Super Admin',
        email: email
      };
      setAdmin(adminData);
      setIsAuthenticated(true);
      localStorage.setItem('admin', JSON.stringify(adminData));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin');
  };

  const value = {
    admin,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};