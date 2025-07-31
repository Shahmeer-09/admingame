import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Check, X } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import CouponForm from '../../components/forms/CouponForm';

const Coupons = () => {
  const [coupons, setCoupons] = useState([
    {
      id: '1',
      code: 'WELCOME50',
      gems: 50,
      isUsed: false
    },
    {
      id: '2',
      code: 'BONUS100',
      gems: 100,
      isUsed: true
    },
    {
      id: '3',
      code: 'NEWUSER25',
      gems: 25,
      isUsed: false
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'code',
      label: 'Coupon Code',
      render: (value) => (
        <span className="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
          {value}
        </span>
      )
    },
    {
      key: 'gems',
      label: 'Gems Value',
      render: (value) => (
        <div className="flex items-center space-x-1">
          <span className="font-medium text-blue-600">{value}</span>
          <span className="text-sm text-gray-500">gems</span>
        </div>
      )
    },
    {
      key: 'isUsed',
      label: 'Status',
      render: (value) => (
        <div className="flex items-center">
          {value ? (
            <>
              <X className="h-4 w-4 text-red-500 mr-2" />
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                Used
              </span>
            </>
          ) : (
            <>
              <Check className="h-4 w-4 text-green-500 mr-2" />
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Available
              </span>
            </>
          )}
        </div>
      )
    }
  ];

  const handleCreate = () => {
    setEditingCoupon(null);
    setIsModalOpen(true);
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(coupon => coupon.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingCoupon) {
      setCoupons(coupons.map(coupon => 
        coupon.id === editingCoupon.id ? { ...coupon, ...formData } : coupon
      ));
    } else {
      const newCoupon = {
        id: Date.now().toString(),
        ...formData
      };
      setCoupons([...coupons, newCoupon]);
    }
    setIsModalOpen(false);
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-semibold text-gray-900">Coupons</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage discount coupons and gem rewards
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Coupon
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
                placeholder="Search coupons..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
              />
            </div>
          </div>

          <DataTable
            data={filteredCoupons}
            columns={columns}
            actions={actions}
            keyField="id"
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
      >
        <CouponForm
          coupon={editingCoupon}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Coupons;