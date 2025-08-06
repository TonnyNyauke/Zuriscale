'use client';

import React, { useState } from 'react';
import { useSaleManagement } from './Basic/useSaleManagement';
import { formatCurrency, CustomerData } from '@/app/types/pos';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { AddItemForm } from './Basic/AddItemForm';
import { CurrentSale } from './Basic/CurrentSale';
import { RecentSales } from './Basic/RecentSale';
import { CustomerForm } from './Basic/CustomerForm';
import { PaymentStep } from './Basic/PaymentStep';
import { BottomCTA } from './Basic/BottomCTA';
import { ErrorHandler, LoadingOverlay, SuccessNotification } from '@/components/ErrorHandler';
import { getRecentSales } from './Basic/HelperFunctions/sales';


export default function ZuriscalePOS() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // Updated type to match Supabase data structure
  const [recentSales, setRecentSales] = useState<Array<{
    id: string;
    total_amount: number;
    created_at: string;
    customers: {
      name: string;
      phone_number: string;
    } | null;
    sale_items: Array<{
      item_name: string;
      quantity: number;
      unit_price: number;
    }>;
  }>>([]);
  const {
    // State
    saleItems,
    customerData,
    currentStep,
    isProcessing,
    completedSale,
    total,
    
    // Actions
    addItem,
    updateQuantity,
    removeItem,
    setCustomerData,
    processSale,
    startNewSale,
    
    // Navigation
    goToCustomerStep,
    goToPaymentStep,
    goBackStep,
    
    // Validation
    canProceedToCustomer,
    canProceedToPayment
  } = useSaleManagement();

  // Handle sale completion with error handling
  const handleCompleteSale = async () => {
    try {
      setError(null);
      await processSale();
      setSuccessMessage('Sale completed successfully!');
    } catch (err) {
      console.error('Sale failed:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    }
  };

  // Handle adding items with validation
  const handleAddItem = (name: string, price: number) => {
    try {
      if (!name.trim()) {
        setError('Item name cannot be empty');
        return;
      }
      if (price <= 0) {
        setError('Item price must be greater than 0');
        return;
      }
      addItem(name, price);
      setSuccessMessage('Item added to sale');
    } catch (err) {
      console.error('Failed to add item:', err);
      setError('Failed to add item');
    }
  };

  // Handle customer data updates with validation
  const handleCustomerChange = (newCustomerData: CustomerData) => {
    try {
      setCustomerData(newCustomerData);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Failed to update customer information:', err);
      setError('Failed to update customer information');
    }
  };

  // Helper function to extract error messages
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unexpected error occurred. Please try again.';
  };

  // Fixed useEffect to properly handle async function
  React.useEffect(() => {
    async function fetchRecentSales() {
      try {
        const salesData = await getRecentSales();
        setRecentSales(salesData);
      } catch (err) {
        console.error('Failed to fetch recent sales:', err);
        setError('Failed to load recent sales');
      }
    }
    
    fetchRecentSales();
  }, []);

  // Clear success message after timeout
  React.useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Show completion screen
  if (currentStep === 'complete' && completedSale) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sale Complete!</h2>
          <p className="text-gray-600 mb-4">
            Receipt sent to {completedSale.customer.customer_phone}
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold text-gray-900">
              Total: {formatCurrency(completedSale.total)}
            </p>
            <p className="text-sm text-gray-600">
              {completedSale.items.length} items
            </p>
          </div>
          <button
            onClick={startNewSale}
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors"
          >
            Start New Sale
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {currentStep !== 'sale' && (
                <button
                  onClick={goBackStep}
                  className="mr-3 p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-gray-900">
                {getStepTitle(currentStep)}
              </h1>
            </div>
            
            {/* Step indicator */}
            <div className="flex items-center space-x-2">
              <StepIndicator step={1} active={currentStep === 'sale'} completed={['customer', 'payment'].includes(currentStep)} />
              <StepIndicator step={2} active={currentStep === 'customer'} completed={currentStep === 'payment'} />
              <StepIndicator step={3} active={currentStep === 'payment'} completed={false} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="space-y-6">
          
          {/* Sale Step */}
          {currentStep === 'sale' && (
            <>
              <AddItemForm onAddItem={handleAddItem} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <CurrentSale
                    saleItems={saleItems}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeItem}
                    total={total}
                  />
                </div>
                
                <div className="lg:col-span-1">
                  <RecentSales sales={recentSales} />
                </div>
              </div>
            </>
          )}

          {/* Customer Step */}
          {currentStep === 'customer' && (
            <CustomerForm
              customerData={customerData}
              onChange={handleCustomerChange}
              saleItems={saleItems}
              total={total}
            />
          )}

          {/* Payment Step */}
          {currentStep === 'payment' && (
            <PaymentStep
              customerData={customerData}
              total={total}
            />
          )}

        </div>
      </main>

      {/* Bottom CTA */}
      <BottomCTA
        currentStep={currentStep}
        itemCount={saleItems.length}
        canProceedToCustomer={canProceedToCustomer}
        canProceedToPayment={canProceedToPayment}
        onContinueToCustomer={goToCustomerStep}
        onContinueToPayment={goToPaymentStep}
        onCompleteSale={handleCompleteSale}
      />

      {/* Error Handler */}
      <ErrorHandler error={error} onClose={() => setError(null)} />
      
      {/* Success Notification */}
      {successMessage && (
        <SuccessNotification 
          message={successMessage} 
          onClose={() => setSuccessMessage(null)} 
        />
      )}

      {/* Processing Overlay */}
      {isProcessing && (
        <LoadingOverlay message="Processing your sale..." />
      )}
    </div>
  );
}

// Helper component for step indicator
const StepIndicator: React.FC<{ step: number; active: boolean; completed: boolean }> = ({
  step,
  active,
  completed
}) => (
  <div
    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
      completed
        ? 'bg-teal-600 text-white'
        : active
        ? 'bg-teal-100 text-teal-600 border-2 border-teal-600'
        : 'bg-gray-200 text-gray-500'
    }`}
  >
    {completed ? '✓' : step}
  </div>
);

// Helper function for step titles
function getStepTitle(step: 'sale' | 'customer' | 'payment' | 'complete'): string {
  switch (step) {
    case 'sale':
      return 'Create Sale';
    case 'customer':
      return 'Customer Information';
    case 'payment':
      return 'Payment';
    case 'complete':
      return 'Sale Complete';
    default:
      return 'Point of Sale';
  }
}