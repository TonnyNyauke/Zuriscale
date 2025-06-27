// app/(main)/customers/page.tsx
'use client'

import React, { useState, useMemo } from 'react';
import { UserPlus } from 'lucide-react';
import DashboardStats from '@/components/customers/DashboardStats';
import FiltersAndSearch from '@/components/customers/FiltersAndSearch';
import AddProspectModal from '@/components/customers/AddProspectModal';
import { Customer, Prospect } from '@/app/types/types';
import CustomersTable from '@/components/customers/CustomerTable';

// Mock data - replace with actual data fetching
const mockProspects: Prospect[] = [
  {
    id: '1',
    name: 'Jane Mutua',
    phone: '+254712345678',
    inquiry: 'Looking for wedding dress',
    visit_date: '2024-06-25',
    budget: 50000,
    status: 'new',
    created_at: '2024-06-25T10:30:00Z'
  },
  {
    id: '2',
    name: 'Peter Kimani',
    phone: '+254723456789',
    inquiry: 'Casual wear for office',
    visit_date: '2024-06-24',
    budget: 15000,
    status: 'contacted',
    created_at: '2024-06-24T14:15:00Z'
  },
  {
    id: '3',
    name: 'Grace Achieng',
    inquiry: 'Evening gown for event',
    visit_date: '2024-06-23',
    status: 'interested',
    created_at: '2024-06-23T16:20:00Z'
  }
];

const mockCustomers: Customer[] = [
  {
    id: '1',
    //retailer_id: 'ret_001',
    phone: '+254734567890',
    name: 'Mary Wanjiku',
    first_purchase: '2024-05-15',
    last_purchase: '2024-06-20',
    total_spent: 45000,
    purchase_count: 5,
    status: 'repeat',
    status_level: '',
    total_orders: 0,
    last_order: '',
    tags: [],
    notes: ''
  },
  {
    id: '2',
    //retailer_id: 'ret_001',
    phone: '+254745678901',
    name: 'John Mwangi',
    first_purchase: '2024-06-10',
    last_purchase: '2024-06-10',
    total_spent: 12000,
    purchase_count: 1,
    status: 'new',
    status_level: '',
    total_orders: 0,
    last_order: '',
    tags: [],
    notes: ''
  },
  {
    id: '3',
    //retailer_id: 'ret_001',
    phone: '+254756789012',
    name: 'Sarah Njeri',
    first_purchase: '2024-04-20',
    last_purchase: '2024-04-20',
    total_spent: 8500,
    purchase_count: 1,
    status: 'churned',
    status_level: '',
    total_orders: 0,
    last_order: '',
    tags: [],
    notes: ''
  }
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [prospects, setProspects] = useState<Prospect[]>(mockProspects);
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'customers' | 'prospects'>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  // Handle adding new prospect
  const handleAddProspect = async (prospectData: Omit<Prospect, 'id' | 'visit_date' | 'status' | 'created_at'>) => {
    try {
      // TODO: Replace with actual API call to Supabase
      const newProspect: Prospect = {
        ...prospectData,
        id: Date.now().toString(), // In real app, this would be handled by Supabase
        visit_date: new Date().toISOString().split('T')[0],
        status: 'new',
        created_at: new Date().toISOString()
      };

      setProspects(prev => [newProspect, ...prev]);
      
      // Show success message (you might want to use a toast library)
      console.log('Prospect added successfully:', newProspect);
      
    } catch (error) {
      console.error('Error adding prospect:', error);
      throw error; // Re-throw to handle in modal
    }
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
        onAdd={handleAddProspect}
      />
    </div>
  );
}