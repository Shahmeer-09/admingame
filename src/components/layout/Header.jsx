import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ setSidebarOpen }) => {
  const { admin, logout } = useAuth();

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>
      
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">{admin?.name}</span>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;