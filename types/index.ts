 // React Types
import React from 'react';

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  dateOfBirth?: string;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'user' | 'admin' | 'moderator';

// Auth Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Dashboard Types
export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  recentOrders: Order[];
  userGrowth: GrowthData[];
  revenueGrowth: GrowthData[];
}

export interface GrowthData {
  period: string;
  value: number;
  growth?: number;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type OrderPaymentMethod = 'card' | 'bank_transfer' | 'paypal' | 'cash_on_delivery';

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  trackQuantity: boolean;
  quantity: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  categoryId: string;
  categoryName: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Common Types
export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
}

export interface FilterOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  width?: number;
  render?: (value: any, record: T) => React.ReactNode;
}

// Form Types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

// Policy Types (Insurance Policies)
export interface Policy {
  id: string;
  policyNumber: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    vin?: string;
    licensePlate: string;
  };
  coverage: {
    type: CoverageType;
    amount: number;
    deductible: number;
  };
  dates: {
    startDate: string;
    endDate: string;
    issueDate: string;
  };
  status: PolicyStatus;
  premium: {
    amount: number;
    frequency: PremiumFrequency;
    nextDueDate: string;
  };
  payments?: Payment[];
  claims?: Claim[];
  documents?: PolicyDocument[];
  notes?: string;
  agent?: {
    name?: string;
    code?: string;
    contact?: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CoverageType = 'basic' | 'standard' | 'premium' | 'comprehensive';
export type PolicyStatus = 'active' | 'expired' | 'cancelled' | 'pending' | 'suspended';
export type PremiumFrequency = 'monthly' | 'quarterly' | 'semi-annual' | 'annual';

export interface Payment {
  id: string;
  amount: number;
  date: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  notes?: string;
}

export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'cash' | 'check';

export interface Claim {
  id: string;
  claimNumber: string;
  date: string;
  type: ClaimType;
  description: string;
  amount?: number;
  status: ClaimStatus;
  adjusterNotes?: string;
}

export type ClaimType = 'accident' | 'theft' | 'vandalism' | 'natural_disaster' | 'other';
export type ClaimStatus = 'filed' | 'under_review' | 'approved' | 'denied' | 'paid';

export interface PolicyDocument {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  uploadedAt: string;
  size?: number;
  mimeType?: string;
}

export type DocumentType = 'policy' | 'claim' | 'payment' | 'vehicle' | 'other';

// Navigation Types
export interface NavItem {
  key: string;
  title: string;
  icon: string;
  path: string;
  badge?: string | number;
  children?: NavItem[];
}
