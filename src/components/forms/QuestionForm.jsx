import React from 'react';
import { useForm } from 'react-hook-form';

const QuestionForm = ({ question, categories, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: question || {
      categoryId: '',
      question: '',
      answer: '',
      points: 10,
      imageUrl: '',
      yt_url: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <select
          {...register('categoryId', { required: 'Category is required' })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
          Question *
        </label>
        <textarea
          {...register('question', { required: 'Question is required' })}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter the question"
        />
        {errors.question && (
          <p className="mt-1 text-sm text-red-600">{errors.question.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
          Answer *
        </label>
        <textarea
          {...register('answer', { required: 'Answer is required' })}
          rows={2}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter the answer"
        />
        {errors.answer && (
          <p className="mt-1 text-sm text-red-600">{errors.answer.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="points" className="block text-sm font-medium text-gray-700">
          Points *
        </label>
        <input
          {...register('points', { 
            required: 'Points is required',
            min: { value: 1, message: 'Points must be at least 1' }
          })}
          type="number"
          min="1"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="10"
        />
        {errors.points && (
          <p className="mt-1 text-sm text-red-600">{errors.points.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          {...register('imageUrl')}
          type="url"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label htmlFor="yt_url" className="block text-sm font-medium text-gray-700">
          YouTube URL
        </label>
        <input
          {...register('yt_url')}
          type="url"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="https://youtube.com/watch?v=..."
        />
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
          {question ? 'Update' : 'Create'} Question
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;