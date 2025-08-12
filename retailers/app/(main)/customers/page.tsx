// app/(main)/customers/page.tsx
'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { UserPlus, AlertCircle, RefreshCw } from 'lucide-react';
import DashboardStats from '@/components/customers/DashboardStats';
import FiltersAndSearch from '@/components/customers/FiltersAndSearch';
import AddProspectModal from '@/components/customers/AddProspectModal';
import { Customer, Prospect } from '@/app/types/types';
import CustomersTable from '@/components/customers/CustomerTable';
import { getProspects } from '@/app/actions/prospects/getProspect';
import MobileTour, { TourStep } from '@/components/tour/MobileTour';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { getCustomers } from '@/app/actions/customers/getCustomers';


const supabase = createClient()

export default function CustomersPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [customers, setCusomers] = useState<Customer[]>([]);
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'customers' | 'prospects'>('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Tour state
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter()

  // Error and loading states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tour steps optimized for mobile
  const tourSteps: TourStep[] = [
    {
      target: '[data-tour="title"]',
      title: 'Welcome to Customer Management',
      content: 'This is your customer management dashboard where you can track prospects and manage customer relationships effectively.',
      placement: isMobile ? 'bottom' : 'right'
    },
    {
      target: '[data-tour="dashboard-stats"]',
      title: 'Dashboard Overview',
      content: 'View key metrics and performance indicators about your customers and prospects at a glance.',
      placement: 'bottom'
    },
    {
      target: '[data-tour="filters-and-search"]',
      title: 'Search & Filter',
      content: 'Use these powerful filters to search and organize your customers and prospects. You can filter by type, status, and search by name or phone.',
      placement: 'bottom'
    },
    {
      target: '[data-tour="customers-table"]',
      title: 'Customer Data',
      content: 'All your customers and prospects are displayed here with their complete information. You can view details, edit, and manage them from this table.',
      placement: isMobile ? 'top' : 'center'
    },
    {
      target: '[data-tour="add-prospect-modal"]',
      title: 'Add New Customers',
      content: 'Click this button to add new walk-in customers to your system. You can capture their information and track their journey.',
      placement: 'bottom'
    },
  ];

  const fetchProspects = async (showRetrying = false) => {
    try {
      if (showRetrying) {
        setIsRetrying(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const {data: {session}} = await supabase.auth.getSession();
      if(!session){
        router.push('/login');
        return;
      }

      const prospects = await getProspects();
      setProspects(prospects);
    } catch (error) {
      console.error('Error fetching prospects:', error);
      
      // Handle different types of errors
      if (error instanceof Error) {
        if (error.message.includes('auth') || error.message.includes('unauthorized')) {
          // Authentication error - redirect to login
          router.push('/login');
          return;
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError('Failed to load customer data. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  };

  const fetchCustomers = async (showRetrying = false) => {
    try {
      if (showRetrying) {
        setIsRetrying(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const customers = await getCustomers();
      setCusomers(customers);
    } catch (error) {
      console.error('Error fetching prospects:', error);
      
      // Handle different types of errors
      if (error instanceof Error) {
        if (error.message.includes('auth') || error.message.includes('unauthorized')) {
          // Authentication error - redirect to login
          router.push('/login');
          return;
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError('Failed to load customer data. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    fetchProspects();
    fetchCustomers();
  }, []);

  const handleRetry = () => {
    fetchProspects(true);
  };

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    let filteredCustomers = customers;
    let filteredProspects = prospects;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredCustomers = customers.filter(
        (customer: Customer) => 
          customer.name.toLowerCase().includes(searchLower) ||
          customer.phone_number.toLowerCase().includes(searchLower)
      );
      filteredProspects = prospects.filter(
        (prospect: Prospect) => 
          prospect.name.toLowerCase().includes(searchLower) ||
          (prospect.phone && prospect.phone.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filteredCustomers = filteredCustomers.filter((customer: Customer) => customer.status === statusFilter);
      filteredProspects = filteredProspects.filter((prospect: Prospect) => prospect.status === statusFilter);
    }

    return { customers: filteredCustomers, prospects: filteredProspects };
  }, [customers, prospects, searchTerm, statusFilter]);

  // Get total count for display
  const getTotalCount = (): number => {
    if (selectedFilter === 'customers') return filteredData.customers.length;
    if (selectedFilter === 'prospects') return filteredData.prospects.length;
    return filteredData.customers.length + filteredData.prospects.length;
  };

  const handleStartTour = () => {
    setIsTourOpen(true);
  };

  const handleCloseTour = () => {
    setIsTourOpen(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading customer data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center max-w-md">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRetrying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Mobile Tour Component */}
      <MobileTour
        steps={tourSteps}
        isOpen={isTourOpen}
        onClose={handleCloseTour}
        primaryColor="#0d9488"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div data-tour="title">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Customer Management
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Track prospects and manage customer relationships
          </p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleStartTour}
            className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base flex-1 sm:flex-none justify-center"
          >
            Start Tour
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            data-tour="add-prospect-modal"
            className="flex items-center px-3 sm:px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors text-sm sm:text-base flex-1 sm:flex-none justify-center"
          >
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className={isMobile ? "hidden" : "inline"}>Add Walk-in Customer</span>
            <span className={isMobile ? "inline" : "hidden"}>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div data-tour="dashboard-stats" className="mb-6">
        <DashboardStats 
          customers={customers} 
          prospects={prospects} 
        />
      </div>

      {/* Filters and Search */}
      <div data-tour="filters-and-search" className="mb-6">
        <FiltersAndSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          totalCount={getTotalCount()}
        />
      </div>

      {/* Customers Table */}
      <div data-tour="customers-table">
        <CustomersTable
          customers={selectedFilter === 'prospects' ? [] : filteredData.customers}
          prospects={selectedFilter === 'customers' ? [] : filteredData.prospects}
          selectedFilter={selectedFilter}
        />
      </div>

      {/* Add Prospect Modal */}
      <AddProspectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProspectAdded={fetchProspects}
      />
    </div>
  );
}