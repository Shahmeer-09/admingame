import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, ExternalLink } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import QuestionForm from '../../components/forms/QuestionForm';

const Questions = () => {
  const [questions, setQuestions] = useState([
    {
      id: '1',
      categoryId: '1',
      categoryName: 'Science',
      question: 'What is the chemical symbol for water?',
      answer: 'H2O',
      points: 10,
      imageUrl: 'https://images.pexels.com/photos/954929/pexels-photo-954929.jpeg?auto=compress&cs=tinysrgb&w=400',
      yt_url: 'https://youtube.com/watch?v=example1'
    },
    {
      id: '2',
      categoryId: '2',
      categoryName: 'History',
      question: 'Who was the first president of the United States?',
      answer: 'George Washington',
      points: 15,
      imageUrl: null,
      yt_url: null
    }
  ]);

  const [categories] = useState([
    { id: '1', name: 'Science' },
    { id: '2', name: 'History' },
    { id: '3', name: 'Sports' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'question',
      label: 'Question',
      render: (value, item) => (
        <div className="max-w-xs">
          <p className="font-medium text-gray-900 truncate">{value}</p>
          <p className="text-sm text-gray-500">{item.categoryName}</p>
        </div>
      )
    },
    {
      key: 'answer',
      label: 'Answer',
      render: (value) => (
        <div className="max-w-xs">
          <p className="text-gray-900 truncate">{value}</p>
        </div>
      )
    },
    {
      key: 'points',
      label: 'Points',
      render: (value) => (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          {value} pts
        </span>
      )
    },
    {
      key: 'imageUrl',
      label: 'Image',
      render: (value) => (
        value ? (
          <img src={value} alt="Question" className="h-10 w-10 rounded object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        )
      )
    },
    {
      key: 'yt_url',
      label: 'Video',
      render: (value) => (
        value ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <span className="text-gray-400 text-sm">No video</span>
        )
      )
    }
  ];

  const handleCreate = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    const categoryName = categories.find(cat => cat.id === formData.categoryId)?.name || '';
    
    if (editingQuestion) {
      setQuestions(questions.map(q => 
        q.id === editingQuestion.id ? { ...q, ...formData, categoryName } : q
      ));
    } else {
      const newQuestion = {
        id: Date.now().toString(),
        ...formData,
        categoryName
      };
      setQuestions([...questions, newQuestion]);
    }
    setIsModalOpen(false);
  };

  const filteredQuestions = questions.filter(question =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const actions = [
    {
      label: 'Edit',
      icon: Edit2,
      onClick: handleEdit,
      className: 'text-indigo-600 hover:text-indigo-900'
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: handleDelete,
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Questions</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage quiz questions and their content
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
              />
            </div>
          </div>

          <DataTable
            data={filteredQuestions}
            columns={columns}
            actions={actions}
            keyField="id"
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingQuestion ? 'Edit Question' : 'Create Question'}
        size="lg"
      >
        <QuestionForm
          question={editingQuestion}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Questions;