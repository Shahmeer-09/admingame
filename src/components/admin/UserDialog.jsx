import React, { useState, useEffect } from 'react';
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
import { userSchema } from '@/lib/validations';
import { toast } from 'sonner';

export const UserDialog = ({ isOpen, onClose, user, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        location: user.location,
      });
    } else {
      reset({
        name: '',
        email: '',
        location: '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await authService.updateUser(user.id, data);
        toast.success('User updated successfully!');
      } else {
        await authService.createUser(data);
        toast.success('User created successfully!');
      }
      onSuccess();
      onClose();
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
          <DialogTitle className="text-xl">
            {isEditing ? 'Edit User' : 'Create New User'}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {isEditing 
              ? 'Update the user information below.' 
              : 'Enter the details for the new user.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">Full Name</Label>
            <Input
              id="name"
              {...register('name')}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter full name"
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
              placeholder="Enter email address"
              disabled={isEditing}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
            {isEditing && (
              <p className="text-xs text-slate-400">Email cannot be changed</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-slate-200">Location</Label>
            <Input
              id="location"
              {...register('location')}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter location (optional)"
            />
            {errors.location && (
              <p className="text-red-400 text-sm">{errors.location.message}</p>
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
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditing ? 'Update User' : 'Create User'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};