'use client';

import { useState, useCallback, useMemo } from 'react';
import { SaleItem, CustomerData, Sale } from '@/app/types/pos';

export const useSaleManagement = () => {
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    phone: ''
  });
  const [currentStep, setCurrentStep] = useState<'sale' | 'customer' | 'payment' | 'complete'>('sale');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedSale, setCompletedSale] = useState<Sale | null>(null);

  const addItem = useCallback((name: string, price: number) => {
    const newItem: SaleItem = {
      id: Date.now().toString(),
      name,
      price,
      quantity: 1
    };
    setSaleItems(prev => [...prev, newItem]);
  }, []);

  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSaleItems(prev => prev.filter(item => item.id !== id));
      return;
    }
    setSaleItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setSaleItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const total = useMemo(() => {
    return saleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [saleItems]);

  const processSale = useCallback(async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newSale: Sale = {
      id: Date.now().toString(),
      items: [...saleItems],
      customer: { ...customerData },
      total,
      timestamp: new Date(),
      status: 'completed'
    };
    
    setCompletedSale(newSale);
    setIsProcessing(false);
    setCurrentStep('complete');
    
    // Auto-reset after 5 seconds
    setTimeout(() => {
      startNewSale();
    }, 5000);
  }, [saleItems, customerData, total]);

  const startNewSale = useCallback(() => {
    setSaleItems([]);
    setCustomerData({ name: '', phone: '' });
    setCompletedSale(null);
    setCurrentStep('sale');
  }, []);

  const handleBack = useCallback(() => {
    if (currentStep === 'customer') setCurrentStep('sale');
    if (currentStep === 'payment') setCurrentStep('customer');
  }, [currentStep]);

  return {
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
  };
};