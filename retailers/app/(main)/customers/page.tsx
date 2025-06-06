// src/app/(main)/customers/page.tsx
import { fetchCustomerData } from '@/app/lib/data';
import CustomerTable from '@/components/customers/CustomerTable';

export default async function CustomersPage() {
  const { customers } = await fetchCustomerData();
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg">
          + Add Customer
        </button>
      </div>
      
      <CustomerTable customers={customers} />
    </div>
  );
}