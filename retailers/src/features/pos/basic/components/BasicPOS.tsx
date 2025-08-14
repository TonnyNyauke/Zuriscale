'use client';

import React, { useState } from 'react';
import { useSaleManagement } from '../hooks/useSaleManagement';
import { AddItemForm } from './AddItemForm';
import { CurrentSale } from './CurrentSale';
import { CustomerForm } from './CustomerForm';
import { PaymentStep } from './PaymentStep';
import { SuccessScreen } from './SuccessScreen';
import { ProgressBar } from './ProgressBar';
import { TierLimit } from '../../shared/components/TierLimit';
import { formatCurrency } from '../../shared/utils/formatting';

export function BasicPOS() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const {
    saleItems,
    customerData,
    currentStep,
    isProcessing,
    completedSale,
    total,
    limits,
    
    addItem,
    updateQuantity,
    removeItem,
    setCustomerData,
    processSale,
    startNewSale,
    
    goToCustomerStep,
    goToPaymentStep,
    goBackStep,
    
    canProceedToCustomer,
    canProceedToPayment
  } = useSaleManagement();

  const handleCompleteSale = async () => {
    try {
      setError(null);
      await processSale();
      setSuccessMessage('Sale completed successfully!');
    } catch (err) {
      console.error('Sale failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    }
  };

  const handleAddItem = (name: string, price: number) => {
    try {
      if (saleItems.length >= limits.maxItemsPerSale) {
        setError(`Basic plan allows maximum ${limits.maxItemsPerSale} items per sale`);
        return;
      }
      
      addItem(name, price);
      setSuccessMessage('Item added to sale');
      setError(null);
    } catch (err) {
      console.error('Failed to add item:', err);
      setError('Failed to add item');
    }
  };

  const handleCustomerChange = (newCustomerData: any) => {
    try {
      setCustomerData(newCustomerData);
      setError(null);
    } catch (err) {
      console.error('Failed to update customer information:', err);
      setError('Failed to update customer information');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'items':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AddItemForm 
                onAddItem={handleAddItem}
                currentItemCount={saleItems.length}
              />
            </div>
            <div>
              <CurrentSale 
                items={saleItems}
                total={total}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onProceed={goToCustomerStep}
                canProceed={canProceedToCustomer}
              />
            </div>
          </div>
        );
      
      case 'customer':
        return (
          <div className="max-w-2xl mx-auto">
            <CustomerForm 
              customerData={customerData}
              onCustomerChange={handleCustomerChange}
              onBack={goBackStep}
              onProceed={goToPaymentStep}
              canProceed={canProceedToPayment}
            />
          </div>
        );
      
      case 'payment':
        return (
          <div className="max-w-2xl mx-auto">
            <PaymentStep 
              total={total}
              customerData={customerData}
              onBack={goBackStep}
              onComplete={handleCompleteSale}
              isProcessing={isProcessing}
            />
          </div>
        );
      
      case 'success':
        return (
          <SuccessScreen 
            sale={completedSale}
            onNewSale={startNewSale}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Basic POS System</h2>
          <div className="text-sm text-gray-600">
            {saleItems.length} items • {formatCurrency(total)}
          </div>
        </div>
        
        <ProgressBar currentStep={currentStep} />
        
        {/* Basic Tier Limits */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <TierLimit 
            current={saleItems.length}
            limit={limits.maxItemsPerSale}
            feature="maxItemsPerSale"
            message="Items per sale"
            showProgress={false}
          />
          <TierLimit 
            current={0} // This would come from daily sales tracking
            limit={limits.maxDailySales}
            feature="maxDailySales"
            message="Daily sales limit"
            showProgress={false}
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800 text-sm mt-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Success Display */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">{successMessage}</p>
          <button 
            onClick={() => setSuccessMessage(null)}
            className="text-green-600 hover:text-green-800 text-sm mt-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-gray-200">
        {renderStep()}
      </div>

      {/* Basic Plan Feature Highlight */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Basic Plan Features</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Simple item management with up to {limits.maxItemsPerSale} items per sale</li>
          <li>• Basic customer information collection</li>
          <li>• M-Pesa payment processing</li>
          <li>• Up to {limits.maxDailySales} sales per day</li>
          <li>• WhatsApp receipt generation</li>
        </ul>
        <p className="text-blue-600 text-sm mt-2">
          <a href="/pricing" className="underline hover:text-blue-800">
            Upgrade to Standard for inventory management and analytics
          </a>
        </p>
      </div>
    </div>
  );
}