// components/customers/FiltersAndSearch.tsx
import React from 'react';
import { Search, Filter, Users, Target } from 'lucide-react';

interface FiltersAndSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilter: 'all' | 'customers' | 'prospects';
  setSelectedFilter: (filter: 'all' | 'customers' | 'prospects') => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  totalCount: number;
}

const FiltersAndSearch: React.FC<FiltersAndSearchProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
  statusFilter,
  setStatusFilter,
  totalCount
}) => {
  const filterOptions = [
    { value: 'all', label: 'All', icon: Users },
    { value: 'customers', label: 'Customers', icon: Users },
    { value: 'prospects', label: 'Prospects', icon: Target }
  ];

  const getStatusOptions = () => {
    if (selectedFilter === 'customers') {
      return [
        { value: 'all', label: 'All Status' },
        { value: 'new', label: 'New' },
        { value: 'repeat', label: 'Repeat' },
        { value: 'vip', label: 'VIP' },
        { value: 'churned', label: 'Churned' }
      ];
    } else if (selectedFilter === 'prospects') {
      return [
        { value: 'all', label: 'All Status' },
        { value: 'new', label: 'New' },
        { value: 'contacted', label: 'Contacted' },
        { value: 'interested', label: 'Interested' },
        { value: 'not_interested', label: 'Not Interested' }
      ];
    }
    return [{ value: 'all', label: 'All Status' }];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>

        {/* Type Filter */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {filterOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value as any)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedFilter === option.value
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          >
            {getStatusOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {totalCount} {selectedFilter === 'all' ? 'records' : selectedFilter}
      </div>
    </div>
  );
};

export default FiltersAndSearch;