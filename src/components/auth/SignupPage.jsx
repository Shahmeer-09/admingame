import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/lib/auth';
import { signupSchema } from '@/lib/validations';
import { toast } from 'sonner';

export const SignupPage = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await authService.register(data.name, data.email, data.password);
      login(result.user, result.isAdmin);
      toast.success('Account created successfully!');
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
          <CardTitle className="text-2xl text-center text-white">Create an account</CardTitle>
          <CardDescription className="text-center text-slate-400">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-200">Full Name</Label>
              <Input
                id="name"
                {...register('name')}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

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
              <p className="text-xs text-slate-400">
                Must be 8+ characters with a number and special character
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 mr-2" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-teal-400 hover:text-teal-300 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};