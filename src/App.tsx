import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/auth/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Categories from './pages/admin/Categories';
import Questions from './pages/admin/Questions';
import Users from './pages/admin/Users';
import Coupons from './pages/admin/Coupons';
import Admins from './pages/admin/Admins';
import MetaData from './pages/admin/MetaData';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="categories" element={<Categories />} />
              <Route path="questions" element={<Questions />} />
              <Route path="users" element={<Users />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="admins-management" element={<Admins />} />
              <Route path="metadata" element={<MetaData />} />
            </Route>

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/admin/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;