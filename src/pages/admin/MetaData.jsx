import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Settings } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import MetaDataForm from '../../components/forms/MetaDataForm';

const MetaData = () => {
  const [metaData, setMetaData] = useState([
    {
      id: '1',
      meta_data_name: 'app_version',
      meta_value: '1.0.0'
    },
    {
      id: '2',
      meta_data_name: 'maintenance_mode',
      meta_value: 'false'
    },
    {
      id: '3',
      meta_data_name: 'max_questions_per_game',
      meta_value: '10'
    },
    {
      id: '4',
      meta_data_name: 'daily_gems_limit',
      meta_value: '100'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMetaData, setEditingMetaData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'meta_data_name',
      label: 'Configuration Name',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Settings className="h-4 w-4 text-gray-400" />
          <span className="font-mono text-sm font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'meta_value',
      label: 'Value',
      render: (value) => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {value}
        </span>
      )
    }
  ];

  const handleCreate = () => {
    setEditingMetaData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (data) => {
    setEditingMetaData(data);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      setMetaData(metaData.filter(data => data.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingMetaData) {
      setMetaData(metaData.map(data => 
        data.id === editingMetaData.id ? { ...data, ...formData } : data
      ));
    } else {
      const newMetaData = {
        id: Date.now().toString(),
        ...formData
      };
      setMetaData([...metaData, newMetaData]);
    }
    setIsModalOpen(false);
  };

  const filteredMetaData = metaData.filter(data =>
    data.meta_data_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.meta_value.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-semibold text-gray-900">Game Meta Data</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage application configuration and game settings
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Configuration
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
                placeholder="Search configurations..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
              />
            </div>
          </div>

          <DataTable
            data={filteredMetaData}
            columns={columns}
            actions={actions}
            keyField="id"
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMetaData ? 'Edit Configuration' : 'Create Configuration'}
      >
        <MetaDataForm
          metaData={editingMetaData}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default MetaData;