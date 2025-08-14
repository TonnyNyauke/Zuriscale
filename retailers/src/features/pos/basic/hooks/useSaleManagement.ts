'use client';

import { useState, useCallback } from 'react';
import { SaleItem, CustomerData, Sale, POSStep } from '../../shared/types';
import { validateSale } from '../../shared/utils/validation';
import { generateReference } from '../../shared/utils/formatting';
import { useTier } from '@/shared/context/TierContext';

const POS_STEPS: POSStep[] = [
  {
    id: 'items',
    title: 'Add Items',
    description: 'Add items to the sale',
    isCompleted: false,
    isActive: true,
  },
  {
    id: 'customer',
    title: 'Customer Info',
    description: 'Enter customer details',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 'payment',
    title: 'Payment',
    description: 'Process payment',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 'success',
    title: 'Complete',
    description: 'Sale completed',
    isCompleted: false,
    isActive: false,
  },
];

export function useSaleManagement() {
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [currentStep, setCurrentStep] = useState<POSStep['id']>('items');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedSale, setCompletedSale] = useState<Sale | null>(null);
  const { currentTier } = useTier();

  // Basic tier limits
  const BASIC_LIMITS = {
    maxItemsPerSale: 50,
    maxDailySales: 100,
  };

  const total = saleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addItem = useCallback((name: string, price: number) => {
    if (saleItems.length >= BASIC_LIMITS.maxItemsPerSale) {
      throw new Error(`Basic plan allows maximum ${BASIC_LIMITS.maxItemsPerSale} items per sale`);
    }

    const newItem: SaleItem = {
      id: Date.now().toString(),
      name,
      price,
      quantity: 1,
    };

    setSaleItems(prev => [...prev, newItem]);
  }, [saleItems.length]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setSaleItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setSaleItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const setCustomerDataHandler = useCallback((data: CustomerData) => {
    setCustomerData(data);
  }, []);

  const processSale = useCallback(async () => {
    if (isProcessing) return;

    const validation = validateSale(saleItems, customerData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const sale: Sale = {
        id: generateReference(),
        items: saleItems,
        customer: customerData!,
        total,
        status: 'completed',
        createdAt: new Date(),
        completedAt: new Date(),
        paymentMethod: 'mpesa',
        reference: generateReference(),
      };

      setCompletedSale(sale);
      setCurrentStep('success');
    } catch (error) {
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [saleItems, customerData, total, isProcessing]);

  const startNewSale = useCallback(() => {
    setSaleItems([]);
    setCustomerData(null);
    setCurrentStep('items');
    setCompletedSale(null);
  }, []);

  const goToCustomerStep = useCallback(() => {
    if (saleItems.length === 0) return;
    setCurrentStep('customer');
  }, [saleItems.length]);

  const goToPaymentStep = useCallback(() => {
    if (!customerData) return;
    setCurrentStep('payment');
  }, [customerData]);

  const goBackStep = useCallback(() => {
    switch (currentStep) {
      case 'customer':
        setCurrentStep('items');
        break;
      case 'payment':
        setCurrentStep('customer');
        break;
      case 'success':
        setCurrentStep('payment');
        break;
    }
  }, [currentStep]);

  const canProceedToCustomer = saleItems.length > 0;
  const canProceedToPayment = customerData !== null;

  return {
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
    setCustomerData: setCustomerDataHandler,
    processSale,
    startNewSale,
    
    // Navigation
    goToCustomerStep,
    goToPaymentStep,
    goBackStep,
    
    // Validation
    canProceedToCustomer,
    canProceedToPayment,

    // Tier limits
    limits: BASIC_LIMITS,
  };
}