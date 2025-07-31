import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Gem } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import UserForm from '../../components/forms/UserForm';

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: '1',
      email: 'john@example.com',
      firstName: 'John Doe',
      mobile: '+1234567890',
      gems: 150,
      isactive: true,
      buyGems: true
    },
    {
      id: '2',
      email: 'jane@example.com',
      firstName: 'Jane Smith',
      mobile: '+1987654321',
      gems: 75,
      isactive: true,
      buyGems: false
    },
    {
      id: '3',
      email: 'inactive@example.com',
      firstName: 'Inactive User',
      mobile: null,
      gems: 0,
      isactive: false,
      buyGems: false
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'email',
      label: 'Email',
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          {item.firstName && (
            <div className="text-sm text-gray-500">{item.firstName}</div>
          )}
        </div>
      )
    },
    {
      key: 'mobile',
      label: 'Mobile',
      render: (value) => value || <span className="text-gray-400">Not provided</span>
    },
    {
      key: 'gems',
      label: 'Gems',
      render: (value) => (
        <div className="flex items-center space-x-1">
          <Gem className="h-4 w-4 text-blue-500" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'isactive',
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
      key: 'buyGems',
      label: 'Can Buy Gems',
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
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...formData } : user
      ));
    } else {
      const newUser = {
        id: Date.now().toString(),
        ...formData
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage user accounts and their settings
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
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
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
              />
            </div>
          </div>

          <DataTable
            data={filteredUsers}
            columns={columns}
            actions={actions}
            keyField="id"
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Create User'}
      >
        <UserForm
          user={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Users;