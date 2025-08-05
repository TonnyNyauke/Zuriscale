// app/types/pos.ts
export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
  }
  
  export interface Category {
    id: string;
    name: string;
  }
  
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface Customer {
    phone: string;
    name: string;
    lastPurchase?: string;
    totalSpent?: number;
    visits?: number;
  }
  
  export interface CustomerFormData {
    phone: string;
    name: string;
  }
  
  export interface Receipt {
    id: string;
    customerName: string;
    customerPhone: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    timestamp: string;
    boutiqueName?: string;
  }

  export interface SaleItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface CustomerData {
    name: string;
    phone: string;
  }
  
  export interface Sale {
    id: string;
    items: SaleItem[];
    customer: CustomerData;
    total: number;
    timestamp: Date;
    status: 'completed';
  }

export const formatCurrency = (amount: number): string => `KES ${amount.toFixed(2)}`;

export const formatTime = (date: Date): string => {
  if (!date) return 'N/A';
  return date.toLocaleTimeString('en-KE', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};