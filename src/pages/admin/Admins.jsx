import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Shield } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import AdminForm from '../../components/forms/AdminForm';

const Admins = () => {
  const [admins, setAdmins] = useState([
    {
      id: '1',
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'admin123' // In real app, this would be hashed
    },
    {
      id: '2',
      name: 'John Admin',
      email: 'john.admin@example.com',
      password: 'password123'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-indigo-500" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => (
        <span className="text-gray-900">{value}</span>
      )
    },
    {
      key: 'password',
      label: 'Password',
      render: () => (
        <span className="text-gray-400 font-mono">••••••••</span>
      )
    }
  ];

  const handleCreate = () => {
    setEditingAdmin(null);
    setIsModalOpen(true);
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingAdmin) {
      setAdmins(admins.map(admin => 
        admin.id === editingAdmin.id ? { ...admin, ...formData } : admin
      ));
    } else {
      const newAdmin = {
        id: Date.now().toString(),
        ...formData
      };
      setAdmins([...admins, newAdmin]);
    }
    setIsModalOpen(false);
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-semibold text-gray-900">Admin Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage admin accounts and permissions
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Admin
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
                placeholder="Search admins..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
              />
            </div>
          </div>

          <DataTable
            data={filteredAdmins}
            columns={columns}
            actions={actions}
            keyField="id"
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAdmin ? 'Edit Admin' : 'Create Admin'}
      >
        <AdminForm
          admin={editingAdmin}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Admins;