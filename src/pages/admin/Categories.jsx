import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import CategoryForm from '../../components/forms/CategoryForm';

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Science',
      isActive: true,
      isForFreeUser: true,
      imageUrl: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'History',
      isActive: true,
      isForFreeUser: false,
      imageUrl: 'https://images.pexels.com/photos/1000653/pexels-photo-1000653.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Sports',
      isActive: false,
      isForFreeUser: true,
      imageUrl: null
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value, item) => (
        <div className="flex items-center space-x-3">
          {item.imageUrl && (
            <img src={item.imageUrl} alt={value} className="h-10 w-10 rounded-lg object-cover" />
          )}
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (value) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'isForFreeUser',
      label: 'Free User Access',
      render: (value) => (
        <div className="flex items-center">
          {value ? (
            <Eye className="h-4 w-4 text-green-500" />
          ) : (
            <EyeOff className="h-4 w-4 text-red-500" />
          )}
          <span className={`ml-2 text-sm ${value ? 'text-green-700' : 'text-red-700'}`}>
            {value ? 'Yes' : 'No'}
          </span>
        </div>
      )
    }
  ];

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, ...formData } : cat
      ));
    } else {
      const newCategory = {
        id: Date.now().toString(),
        ...formData
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage question categories and their settings
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
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
                placeholder="Search categories..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
              />
            </div>
          </div>

          <DataTable
            data={filteredCategories}
            columns={columns}
            actions={actions}
            keyField="id"
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Categories;