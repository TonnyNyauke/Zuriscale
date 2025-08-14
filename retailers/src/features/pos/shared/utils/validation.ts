import { CustomerData, SaleItem } from '../types';

export const validateCustomerData = (data: CustomerData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push('Customer name is required');
  }

  if (!data.phone.trim()) {
    errors.push('Phone number is required');
  } else if (!isValidPhoneNumber(data.phone)) {
    errors.push('Please enter a valid Kenyan phone number');
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateSaleItem = (item: Omit<SaleItem, 'id'>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!item.name.trim()) {
    errors.push('Item name is required');
  }

  if (item.price <= 0) {
    errors.push('Item price must be greater than 0');
  }

  if (item.quantity <= 0) {
    errors.push('Item quantity must be greater than 0');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateSale = (items: SaleItem[], customerData: CustomerData | null): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (items.length === 0) {
    errors.push('Sale must have at least one item');
  }

  if (!customerData) {
    errors.push('Customer information is required');
  } else {
    const customerValidation = validateCustomerData(customerData);
    if (!customerValidation.isValid) {
      errors.push(...customerValidation.errors);
    }
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (total <= 0) {
    errors.push('Sale total must be greater than 0');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const isValidPhoneNumber = (phone: string): boolean => {
  // Kenyan phone number validation
  const cleaned = phone.replace(/\D/g, '');
  return /^(254|0|7)\d{8}$/.test(cleaned);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPrice = (price: number): boolean => {
  return price > 0 && price <= 1000000; // Max 1M KES
};

export const isValidQuantity = (quantity: number): boolean => {
  return quantity > 0 && quantity <= 10000; // Max 10K items
};