import React from 'react';
import { useForm } from 'react-hook-form';

const CouponForm = ({ coupon, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: coupon || {
      code: '',
      gems: 10,
      isUsed: false
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Coupon Code *
        </label>
        <input
          {...register('code', { 
            required: 'Coupon code is required',
            pattern: {
              value: /^[A-Z0-9]+$/,
              message: 'Coupon code must contain only uppercase letters and numbers'
            }
          })}
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
          placeholder="WELCOME50"
          style={{ textTransform: 'uppercase' }}
        />
        {errors.code && (
          <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Use only uppercase letters and numbers (e.g., WELCOME50)
        </p>
      </div>

      <div>
        <label htmlFor="gems" className="block text-sm font-medium text-gray-700">
          Gems Value *
        </label>
        <input
          {...register('gems', { 
            required: 'Gems value is required',
            min: { value: 1, message: 'Gems must be at least 1' }
          })}
          type="number"
          min="1"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="10"
        />
        {errors.gems && (
          <p className="mt-1 text-sm text-red-600">{errors.gems.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          {...register('isUsed')}
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Mark as Used
        </label>
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
          {coupon ? 'Update' : 'Create'} Coupon
        </button>
      </div>
    </form>
  );
};

export default CouponForm;