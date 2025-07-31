import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Activity, MapPin } from 'lucide-react';

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}!</h1>
            <p className="text-slate-400 mt-1">Here's your account overview</p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Total Reports
              </CardTitle>
              <Activity className="h-4 w-4 text-teal-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{user?.numberOfReports || 0}</div>
              <p className="text-xs text-slate-400">
                Reports generated
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Email Reports
              </CardTitle>
              <Activity className="h-4 w-4 text-teal-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{user?.reportsEmailedSuccessfully || 0}</div>
              <p className="text-xs text-slate-400">
                Successfully sent via email
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Location
              </CardTitle>
              <MapPin className="h-4 w-4 text-teal-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{user?.location || 'Not set'}</div>
              <p className="text-xs text-slate-400">
                Current location
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Account Information
            </CardTitle>
            <CardDescription className="text-slate-400">
              Your account details and activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Full Name</Label>
                <p className="text-white font-medium">{user?.name}</p>
              </div>
              <div>
                <Label className="text-slate-300">Email Address</Label>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
              <div>
                <Label className="text-slate-300">Last Login</Label>
                <p className="text-white font-medium">{formatDate(user?.lastLogin)}</p>
              </div>
              <div>
                <Label className="text-slate-300">Member Since</Label>
                <p className="text-white font-medium">{formatDate(user?.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Label = ({ className, children, ...props }) => (
  <label className={`text-sm font-medium ${className}`} {...props}>
    {children}
  </label>
);