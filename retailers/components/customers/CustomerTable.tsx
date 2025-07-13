// components/customers/CustomersTable.tsx
import React, { useState } from 'react';
import { Phone, Calendar, DollarSign, ShoppingBag, User, X, Eye } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import { Customer, Prospect } from '@/app/types/types';

interface CustomersTableProps {
  customers: Customer[];
  prospects: Prospect[];
  selectedFilter: 'all' | 'customers' | 'prospects';
}

interface CustomerModalProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
}

interface ProspectModalProps {
  prospect: Prospect;
  isOpen: boolean;
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ customer, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string | null | undefined) => {
    const statusColors = {
      new: 'bg-blue-100 text-blue-800',
      repeat: 'bg-green-100 text-green-800',
      vip: 'bg-purple-100 text-purple-800',
      churned: 'bg-red-100 text-red-800',
    };

    if (!status) {
      return (
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
          UNKNOWN
        </span>
      );
    }

    return (
      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
        statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
      }`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Customer Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
              <div className="flex items-center text-gray-500 mt-1">
                <Phone className="w-4 h-4 mr-2" />
                {customer.phone}
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            {getStatusBadge(customer.status)}
          </div>

          {/* Purchase Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Total Spent</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                KES {customer.total_spent.toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <ShoppingBag className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Purchases</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {customer.purchase_count}
              </div>
            </div>
          </div>

          {/* Last Purchase */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Purchase</label>
            <div className="flex items-center text-gray-900">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              {formatDate(customer.last_purchase)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex space-x-3">
          <WhatsAppButton
            phone={customer.phone}
            name={customer.name}
            type={customer.status === 'churned' ? 'retention' : 'promotion'}
          />
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4 mr-2" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProspectModal: React.FC<ProspectModalProps> = ({ prospect, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string | null | undefined) => {
    const statusColors = {
      contacted: 'bg-yellow-100 text-yellow-800',
      interested: 'bg-emerald-100 text-emerald-800',
      not_interested: 'bg-gray-100 text-gray-800',
      converted: 'bg-green-100 text-green-800'
    };

    if (!status) {
      return (
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
          UNKNOWN
        </span>
      );
    }

    return (
      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
        statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
      }`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Prospect Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Prospect Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{prospect.name}</h3>
              <div className="flex items-center text-gray-500 mt-1">
                {prospect.phone ? (
                  <>
                    <Phone className="w-4 h-4 mr-2" />
                    {prospect.phone}
                  </>
                ) : (
                  <span className="text-gray-400 italic">No phone number</span>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            {getStatusBadge(prospect.status)}
          </div>

          {/* Inquiry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry</label>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">{prospect.inquiry}</p>
            </div>
          </div>

          {/* Budget */}
          {prospect.budget && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <div className="flex items-center text-gray-900">
                <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                KES {prospect.budget.toLocaleString()}
              </div>
            </div>
          )}

          {/* Created Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Created</label>
            <div className="flex items-center text-gray-900">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              {formatDate(prospect.created_at)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex space-x-3">
          <WhatsAppButton
            phone={prospect.phone}
            name={prospect.name}
            type="follow-up"
            inquiry={prospect.inquiry}
            disabled={!prospect.phone}
          />
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4 mr-2" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomersTable: React.FC<CustomersTableProps> = ({ 
  customers, 
  prospects, 
  selectedFilter 
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  const getStatusBadge = (status: string | null | undefined) => {
    const statusColors = {
      // Customer statuses
      new: 'bg-blue-100 text-blue-800',
      repeat: 'bg-green-100 text-green-800',
      vip: 'bg-purple-100 text-purple-800',
      churned: 'bg-red-100 text-red-800',
      // Prospect statuses
      contacted: 'bg-yellow-100 text-yellow-800',
      interested: 'bg-emerald-100 text-emerald-800',
      not_interested: 'bg-gray-100 text-gray-800',
      converted: 'bg-green-100 text-green-800'
    };
  
    // Handle null, undefined, or empty status
    if (!status) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
          UNKNOWN
        </span>
      );
    }
  
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
      }`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };  

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderCustomerRow = (customer: Customer) => (
    <tr key={`customer-${customer.id}`} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              <Phone className="w-3 h-3 mr-1" />
              {customer.phone}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-teal-600">Customer</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(customer.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => setSelectedCustomer(customer)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {formatDate(customer.last_purchase)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <WhatsAppButton
          phone={customer.phone}
          name={customer.name}
          type={customer.status === 'churned' ? 'retention' : 'promotion'}
        />
      </td>
    </tr>
  );

  const renderProspectRow = (prospect: Prospect) => (
    <tr key={`prospect-${prospect.id}`} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{prospect.name}</div>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              {prospect.phone ? (
                <>
                  <Phone className="w-3 h-3 mr-1" />
                  {prospect.phone}
                </>
              ) : (
                <span className="text-gray-400 italic">No phone number</span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-orange-600">Prospect</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(prospect.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => setSelectedProspect(prospect)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {formatDate(prospect.created_at)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <WhatsAppButton
          phone={prospect.phone}
          name={prospect.name}
          type="follow-up"
          inquiry={prospect.inquiry}
          disabled={!prospect.phone}
        />
      </td>
    </tr>
  );

  const renderRows = () => {
    const rows = [];
    
    if (selectedFilter === 'all' || selectedFilter === 'customers') {
      rows.push(...customers.map(renderCustomerRow));
    }
    
    if (selectedFilter === 'all' || selectedFilter === 'prospects') {
      rows.push(...prospects.map(renderProspectRow));
    }
    
    return rows;
  };

  const getEmptyMessage = () => {
    if (selectedFilter === 'customers') return 'No customers found';
    if (selectedFilter === 'prospects') return 'No prospects found';
    return 'No records found';
  };

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {renderRows().length > 0 ? (
              renderRows()
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <User className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-lg font-medium">{getEmptyMessage()}</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {selectedProspect && (
        <ProspectModal
          prospect={selectedProspect}
          isOpen={!!selectedProspect}
          onClose={() => setSelectedProspect(null)}
        />
      )}
    </>
  );
};

export default CustomersTable;