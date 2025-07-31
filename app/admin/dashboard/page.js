'use client'

import { motion } from 'framer-motion'
import { Users, FolderOpen, HelpCircle, Ticket, TrendingUp, Activity, ArrowUp, ArrowDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function Dashboard() {
  const stats = [
    { 
      name: 'Total Users', 
      value: '2,651', 
      icon: Users, 
      change: '+12%', 
      changeType: 'increase',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'Categories', 
      value: '45', 
      icon: FolderOpen, 
      change: '+3%', 
      changeType: 'increase',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'Questions', 
      value: '1,284', 
      icon: HelpCircle, 
      change: '+8%', 
      changeType: 'increase',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      name: 'Active Coupons', 
      value: '23', 
      icon: Ticket, 
      change: '-2%', 
      changeType: 'decrease',
      color: 'from-orange-500 to-orange-600'
    },
  ]

  const recentActivity = [
    { action: 'New user registered', user: 'john@example.com', time: '2 minutes ago', type: 'user' },
    { action: 'Category updated', user: 'Admin', time: '15 minutes ago', type: 'category' },
    { action: 'Question added', user: 'Admin', time: '1 hour ago', type: 'question' },
    { action: 'Coupon used', user: 'jane@example.com', time: '2 hours ago', type: 'coupon' },
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {item.name}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {item.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {item.changeType === 'increase' ? (
                        <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-semibold ${
                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${item.color} shadow-lg`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-indigo-600" />
                  <span>Recent Activity</span>
                </CardTitle>
                <p className="text-gray-600 mt-1">Latest updates from your platform</p>
              </div>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">
                      by <span className="font-medium">{activity.user}</span>
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-xs text-gray-500 font-medium">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}