'use client';

import { useState, useCallback, useMemo } from 'react';
import { SaleItem, CustomerData, Sale } from '@/app/types/pos';
import { createSale } from './HelperFunctions/sales';

type Step = 'sale' | 'customer' | 'payment' | 'complete';

export const useSaleManagement = () => {
  // Separate state for better clarity
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({
    customer_name: '',
    customer_phone: '',
    items: []
  });
  const [currentStep, setCurrentStep] = useState<Step>('sale');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedSale, setCompletedSale] = useState<Sale | null>(null);

  // Calculate total from items
  const total = useMemo(() => {
    return saleItems.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
  }, [saleItems]);

  // Add item to sale
  const addItem = useCallback((name: string, price: number) => {
    const newItem: SaleItem = {
      id: Date.now().toString(),
      item_name: name,
      unit_price: price,
      quantity: 1,
      discount: 0,
      buy_price: price,
      product_id: null,
      sale_id: ''
    };
    setSaleItems(prev => [...prev, newItem]);
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSaleItems(prev => prev.filter(item => item.id !== id));
      return;
    }
    setSaleItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  }, []);

  // Remove item
  const removeItem = useCallback((id: string) => {
    setSaleItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // Process the sale
  const processSale = useCallback(async () => {
    if (!customerData.customer_name || !customerData.customer_phone) {
      throw new Error('Customer information is required');
    }

    if (saleItems.length === 0) {
      throw new Error('No items in sale');
    }

    setIsProcessing(true);
    
    try {
      // Create the sale data with current items
      const saleDataToSubmit: CustomerData = {
        ...customerData,
        items: saleItems
      };

      // Submit to database
      await createSale(saleDataToSubmit, total);
      
      // Create completed sale object
      const newSale: Sale = {
        id: Date.now().toString(),
        items: [...saleItems],
        customer: { ...saleDataToSubmit },
        total,
        timestamp: new Date(),
        status: 'completed'
      };
      
      setCompletedSale(newSale);
      setCurrentStep('complete');
      
      // Auto-reset after 5 seconds
      setTimeout(() => {
        startNewSale();
      }, 5000);
      
    } catch (error) {
      console.error('Sale processing failed:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [saleItems, customerData, total]);

  // Start new sale
  const startNewSale = useCallback(() => {
    setSaleItems([]);
    setCustomerData({
      customer_name: '',
      customer_phone: '',
      items: []
    });
    setCompletedSale(null);
    setCurrentStep('sale');
  }, []);

  // Navigation helpers
  const goToCustomerStep = useCallback(() => {
    if (saleItems.length > 0) {
      setCurrentStep('customer');
    }
  }, [saleItems.length]);

  const goToPaymentStep = useCallback(() => {
    if (customerData.customer_name && customerData.customer_phone) {
      setCurrentStep('payment');
    }
  }, [customerData.customer_name, customerData.customer_phone]);

  const goBackStep = useCallback(() => {
    if (currentStep === 'customer') setCurrentStep('sale');
    if (currentStep === 'payment') setCurrentStep('customer');
  }, [currentStep]);

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
    setCustomerData,
    processSale,
    startNewSale,
    
    // Navigation
    goToCustomerStep,
    goToPaymentStep,
    goBackStep,
    
    // Validation helpers
    canProceedToCustomer: saleItems.length > 0,
    canProceedToPayment: !!(customerData.customer_name?.trim() && customerData.customer_phone?.trim())
  };
};