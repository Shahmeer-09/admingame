import React from 'react';
import { useForm } from 'react-hook-form';

const MetaDataForm = ({ metaData, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: metaData || {
      meta_data_name: '',
      meta_value: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="meta_data_name" className="block text-sm font-medium text-gray-700">
          Configuration Name *
        </label>
        <input
          {...register('meta_data_name', { 
            required: 'Configuration name is required',
            pattern: {
              value: /^[a-z_]+$/,
              message: 'Use only lowercase letters and underscores'
            }
          })}
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
          placeholder="app_version"
        />
        {errors.meta_data_name && (
          <p className="mt-1 text-sm text-red-600">{errors.meta_data_name.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Use snake_case format (e.g., app_version, maintenance_mode)
        </p>
      </div>

      <div>
        <label htmlFor="meta_value" className="block text-sm font-medium text-gray-700">
          Configuration Value *
        </label>
        <input
          {...register('meta_value', { required: 'Configuration value is required' })}
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
          placeholder="1.0.0"
        />
        {errors.meta_value && (
          <p className="mt-1 text-sm text-red-600">{errors.meta_value.message}</p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Configuration Examples
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li><code>app_version</code> → <code>1.0.0</code></li>
                <li><code>maintenance_mode</code> → <code>true/false</code></li>
                <li><code>max_questions_per_game</code> → <code>10</code></li>
                <li><code>daily_gems_limit</code> → <code>100</code></li>
              </ul>
            </div>
          </div>
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
          {metaData ? 'Update' : 'Create'} Configuration
        </button>
      </div>
    </form>
  );
};

export default MetaDataForm;