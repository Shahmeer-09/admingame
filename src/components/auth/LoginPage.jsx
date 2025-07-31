import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ForgotPasswordDialog } from './ForgotPasswordDialog';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { toast } from 'sonner';

export const LoginPage = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await authService.login(data.email, data.password);
      login(result.user, result.isAdmin);
      toast.success('Welcome back!');
      onNavigate(result.isAdmin ? 'admin' : 'dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-white">Sign in</CardTitle>
          <CardDescription className="text-center text-slate-400">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-teal-400 hover:text-teal-300"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-teal-400 hover:text-teal-300 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-4 p-3 bg-slate-700 rounded-lg">
            <p className="text-xs text-slate-300 mb-2">Demo credentials:</p>
            <p className="text-xs text-slate-400">Admin: admin@example.com / password123</p>
            <p className="text-xs text-slate-400">User: john.doe@example.com / password123</p>
          </div>
        </CardContent>
      </Card>

      <ForgotPasswordDialog
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onNavigateToReset={() => onNavigate('reset-password')}
      />
    </div>
  );
};