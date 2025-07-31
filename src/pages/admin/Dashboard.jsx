import React from 'react';
import { Users, FolderOpen, HelpCircle, Ticket, TrendingUp, Activity } from 'lucide-react';

const Dashboard = () => {
  // Mock data - replace with real API calls
  const stats = [
    { name: 'Total Users', value: '2,651', icon: Users, change: '+12%', changeType: 'increase' },
    { name: 'Categories', value: '45', icon: FolderOpen, change: '+3%', changeType: 'increase' },
    { name: 'Questions', value: '1,284', icon: HelpCircle, change: '+8%', changeType: 'increase' },
    { name: 'Active Coupons', value: '23', icon: Ticket, change: '-2%', changeType: 'decrease' },
  ];

  const recentActivity = [
    { action: 'New user registered', user: 'john@example.com', time: '2 minutes ago' },
    { action: 'Category updated', user: 'Admin', time: '15 minutes ago' },
    { action: 'Question added', user: 'Admin', time: '1 hour ago' },
    { action: 'Coupon used', user: 'jane@example.com', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-700">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    {index !== recentActivity.length - 1 && (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.action}
                            <span className="font-medium text-gray-900"> {activity.user}</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;