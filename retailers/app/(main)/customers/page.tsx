// app/(main)/customers/page.tsx
'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import DashboardStats from '@/components/customers/DashboardStats';
import FiltersAndSearch from '@/components/customers/FiltersAndSearch';
import AddProspectModal from '@/components/customers/AddProspectModal';
import { Customer, Prospect } from '@/app/types/types';
import CustomersTable from '@/components/customers/CustomerTable';
import { getProspects } from '@/app/actions/prospects/getProspect';


const mockCustomers: Customer[] = [
];

export default function CustomersPage() {
  //const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const customers = mockCustomers;
  const [prospects, setProspects] = useState<Prospect[]>([]);
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'customers' | 'prospects'>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchProspects = async () => {
      const prospects = await getProspects();
      setProspects(prospects);
    };
    fetchProspects();
  }, []);

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    let filteredCustomers = customers;
    let filteredProspects = prospects;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredCustomers = customers.filter(
        customer => 
          customer.name.toLowerCase().includes(searchLower) ||
          customer.phone.toLowerCase().includes(searchLower)
      );
      filteredProspects = prospects.filter(
        prospect => 
          prospect.name.toLowerCase().includes(searchLower) ||
          (prospect.phone && prospect.phone.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filteredCustomers = filteredCustomers.filter(customer => customer.status === statusFilter);
      filteredProspects = filteredProspects.filter(prospect => prospect.status === statusFilter);
    }

    return { customers: filteredCustomers, prospects: filteredProspects };
  }, [customers, prospects, searchTerm, statusFilter]);

  // Get total count for display
  const getTotalCount = () => {
    if (selectedFilter === 'customers') return filteredData.customers.length;
    if (selectedFilter === 'prospects') return filteredData.prospects.length;
    return filteredData.customers.length + filteredData.prospects.length;
  };

  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Track prospects and manage customer relationships</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add Walk-in Customer
        </button>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats 
        customers={customers} 
        prospects={prospects} 
      />

      {/* Filters and Search */}
      <FiltersAndSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        totalCount={getTotalCount()}
      />

      {/* Customers Table */}
      <CustomersTable
        customers={selectedFilter === 'prospects' ? [] : filteredData.customers}
        prospects={selectedFilter === 'customers' ? [] : filteredData.prospects}
        selectedFilter={selectedFilter}
      />

      {/* Add Prospect Modal */}
      <AddProspectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}