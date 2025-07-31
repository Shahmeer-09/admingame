import React from 'react';
import { useForm } from 'react-hook-form';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: user || {
      email: '',
      firstName: '',
      mobile: '',
      gems: 1,
      isactive: true,
      buyGems: false
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address *
        </label>
        <input
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address'
            }
          })}
          type="email"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="user@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          {...register('firstName')}
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          {...register('mobile')}
          type="tel"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="+1234567890"
        />
      </div>

      <div>
        <label htmlFor="gems" className="block text-sm font-medium text-gray-700">
          Gems *
        </label>
        <input
          {...register('gems', { 
            required: 'Gems is required',
            min: { value: 0, message: 'Gems cannot be negative' }
          })}
          type="number"
          min="0"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="1"
        />
        {errors.gems && (
          <p className="mt-1 text-sm text-red-600">{errors.gems.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <input
            {...register('isactive')}
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Active User
          </label>
        </div>

        <div className="flex items-center">
          <input
            {...register('buyGems')}
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Can Buy Gems
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {user ? 'Update' : 'Create'} User
        </button>
      </div>
    </form>
  );
};

export default UserForm;