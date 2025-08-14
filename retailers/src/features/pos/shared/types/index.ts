export interface CustomerData {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface SaleItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  stock?: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  customer: CustomerData;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
  paymentMethod: 'mpesa' | 'cash' | 'card';
  reference?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface POSStep {
  id: 'items' | 'customer' | 'payment' | 'success';
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface SaleManagementState {
  saleItems: SaleItem[];
  customerData: CustomerData | null;
  currentStep: POSStep['id'];
  isProcessing: boolean;
  completedSale: Sale | null;
  total: number;
}

export interface SaleManagementActions {
  addItem: (name: string, price: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  setCustomerData: (data: CustomerData) => void;
  processSale: () => Promise<void>;
  startNewSale: () => void;
  goToCustomerStep: () => void;
  goToPaymentStep: () => void;
  goBackStep: () => void;
  canProceedToCustomer: boolean;
  canProceedToPayment: boolean;
}

export interface TierCapabilities {
  maxItemsPerSale: number;
  maxDailySales: number;
  inventoryManagement: boolean;
  customerAnalytics: boolean;
  multiLocation: boolean;
  advancedReporting: boolean;
  bulkOperations: boolean;
  customBranding: boolean;
}