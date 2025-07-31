import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { authService } from '@/lib/auth';
import { resetPasswordSchema } from '@/lib/validations';
import { toast } from 'sonner';

export const ResetPasswordPage = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authService.resetPassword('dummy-token', data.password);
      toast.success('Password reset successfully! You can now sign in with your new password.');
      onNavigate('login');
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
          <CardTitle className="text-2xl text-center text-white">Reset your password</CardTitle>
          <CardDescription className="text-center text-slate-400">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">New Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
                placeholder="Enter your new password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
                placeholder="Confirm your new password"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 mr-2" />
                  Resetting password...
                </>
              ) : (
                'Reset password'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('login')}
              className="text-sm text-teal-400 hover:text-teal-300"
            >
              Back to sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};