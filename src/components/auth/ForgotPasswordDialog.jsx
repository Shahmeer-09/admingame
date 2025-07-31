import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { authService } from '@/lib/auth';
import { forgotPasswordSchema } from '@/lib/validations';
import { toast } from 'sonner';

export const ForgotPasswordDialog = ({ isOpen, onClose, onNavigateToReset }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      toast.success('Password reset email sent! Check your inbox.');
      reset();
      onClose();
      // Simulate navigation to reset page
      setTimeout(() => {
        onNavigateToReset();
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Reset your password</DialogTitle>
          <DialogDescription className="text-slate-400">
            Enter your email address and we'll send you a link to reset your password.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-slate-200">Email</Label>
            <Input
              id="reset-email"
              type="email"
              {...register('email')}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 mr-2" />
                  Sending...
                </>
              ) : (
                'Send reset link'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};