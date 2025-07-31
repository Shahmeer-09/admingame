'use client'

import { motion } from 'framer-motion'
import { Menu, LogOut, User, Bell } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Header({ setSidebarOpen, admin, logout }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200"
    >
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden hover:bg-gray-50 transition-colors"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>
      
      <div className="flex-1 px-4 flex justify-between items-center">
        <div className="flex-1 flex items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        
        <div className="ml-4 flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2 rounded-full">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </span>
          </Button>

          {/* Admin info */}
          <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200">
            <div className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{admin?.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}