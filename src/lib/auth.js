import { createUser } from '../types/user.js';

// Mock data for demonstration
const mockUsers = [
  createUser({
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    lastLogin: new Date('2024-01-15'),
    location: 'New York',
    numberOfReports: 25,
    reportsEmailedSuccessfully: 23,
    createdAt: new Date('2023-01-01'),
  }),
  createUser({
    id: '2',
    email: 'john.doe@example.com',
    name: 'John Doe',
    lastLogin: new Date('2024-01-14'),
    location: 'Los Angeles',
    numberOfReports: 12,
    reportsEmailedSuccessfully: 11,
    createdAt: new Date('2023-06-15'),
  }),
  createUser({
    id: '3',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    lastLogin: new Date('2024-01-13'),
    location: 'Chicago',
    numberOfReports: 8,
    reportsEmailedSuccessfully: 7,
    createdAt: new Date('2023-09-20'),
  }),
];

export const authService = {
  login: async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password123') {
      user.lastLogin = new Date();
      return {
        user,
        isAdmin: email === 'admin@example.com'
      };
    }
    throw new Error('Invalid credentials');
  },

  register: async (name, email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser = createUser({
      email,
      name,
      lastLogin: new Date(),
    });

    mockUsers.push(newUser);
    return { user: newUser, isAdmin: false };
  },

  forgotPassword: async (email) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Email not found');
    }

    // In real app, this would send an email with reset link
    return { message: 'Password reset email sent' };
  },

  resetPassword: async (token, newPassword) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, validate token and update password
    return { message: 'Password reset successfully' };
  },

  getAllUsers: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockUsers];
  },

  createUser: async (userData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser = createUser(userData);
    mockUsers.push(newUser);
    return newUser;
  },

  updateUser: async (userId, userData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
    return mockUsers[userIndex];
  },

  deleteUser: async (userId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers.splice(userIndex, 1);
    return { message: 'User deleted successfully' };
  },

  triggerPasswordReset: async (userId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    // In real app, this would send password reset email
    return { message: `Password reset email sent to ${user.email}` };
  }
};