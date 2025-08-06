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

// SaleItem interface
export interface SaleItem {
  id: string;
  item_name: string;
  unit_price: number;
  quantity: number;
  discount: number;
  buy_price: number;
  product_id: string | null;
  sale_id: string;
}

// CustomerData interface  
export interface CustomerData {
  customer_name: string;
  customer_phone: string;
  discount?: number;
  items: SaleItem[];
}

// Keep your original Sale interface
export interface Sale {
  id: string;
  items: SaleItem[];
  customer: CustomerData;
  total: number;
  timestamp: Date;
  status: 'completed';
}

export const formatCurrency = (amount: number | undefined | null): string => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'KES 0.00';
  }
  return `KES ${Number(amount).toFixed(2)}`;
};

export const formatTime = (date: Date): string => {
  if (!date) return 'N/A';
  return date.toLocaleTimeString('en-KE', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};