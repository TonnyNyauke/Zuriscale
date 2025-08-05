'use client';

import React, { useMemo } from 'react';
import { Sale } from '@/app/types/pos';
import { Header } from './Basic/Header';
import { AddItemForm } from './Basic/AddItemForm';
import { CurrentSale } from './Basic/CurrentSale';
import { CustomerForm } from './Basic/CustomerForm';
import { PaymentStep } from './Basic/PaymentStep';
import { RecentSales } from './Basic/RecentSale';
import { SuccessScreen } from './Basic/SuccessScreen';
import { LoadingScreen } from './Basic/LoadingScreen';
import { BottomCTA } from './Basic/BottomCTA';
import { useSaleManagement } from './Basic/useSaleManagement';

export default function ZuriscalePOS() {
  const {
    saleItems,
    customerData,
    currentStep,
    isProcessing,
    completedSale,
    total,
    addItem,
    updateQuantity,
    removeItem,
    setCustomerData,
    setCurrentStep,
    processSale,
    startNewSale,
    handleBack
  } = useSaleManagement();

  // Mock recent sales data
  const recentSales: Sale[] = useMemo(() => [
    {
      id: '1',
      items: [{ id: '1', name: 'Ankara Dress', price: 3500, quantity: 1 }],
      customer: { name: 'Mary Wanjiku', phone: '0722123456' },
      total: 3500,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      id: '2',
      items: [
        { id: '2', name: 'Cotton Blouse', price: 2200, quantity: 2 },
        { id: '3', name: 'Silk Scarf', price: 1800, quantity: 1 }
      ],
      customer: { name: 'Grace Njeri', phone: '0733987654' },
      total: 6200,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed'
    }
  ], []);

  // Handle different screen states
  if (currentStep === 'complete' && completedSale) {
    return <SuccessScreen sale={completedSale} onNewSale={startNewSale} />;
  }

  if (isProcessing) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentStep={currentStep} onBack={handleBack} />
      
      <main className="max-w-6xl mx-auto p-4 pb-24 lg:pb-8">
        {currentStep === 'sale' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AddItemForm onAddItem={addItem} />
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
        )}

        {currentStep === 'customer' && (
          <CustomerForm
            customerData={customerData}
            onChange={setCustomerData}
            saleItems={saleItems}
            total={total}
          />
        )}

        {currentStep === 'payment' && (
          <PaymentStep
            customerData={customerData}
            total={total}
          />
        )}
      </main>

      <BottomCTA
        currentStep={currentStep}
        saleItems={saleItems}
        customerData={customerData}
        onContinueToCustomer={() => setCurrentStep('customer')}
        onContinueToPayment={() => setCurrentStep('payment')}
        onCompleteSale={processSale}
      />
    </div>
  );
}