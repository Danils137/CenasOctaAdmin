import { API_BASE_URL, API_VERSION } from '../constants';
import {
  LoginCredentials,
  AuthResponse,
  ApiResponse,
  PaginatedResponse,
  DashboardStats,
  User,
  Policy,
  FilterOptions
} from '../types';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = `${API_BASE_URL}/${API_VERSION}`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = await this.getStoredToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private async getStoredToken(): Promise<string | null> {
    // This would typically use secure storage
    return localStorage.getItem('auth_token');
  }

  // Auth endpoints
  async register(userData: { name: string; email: string; password: string; phone?: string; role?: string }): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.json();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  }

  async getMe(): Promise<User> {
    return this.request<User>('/users/me').then(res => res.data);
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    return this.request<User>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }).then(res => res.data);
  }

  async updatePassword(passwordData: { currentPassword: string; newPassword: string }): Promise<AuthResponse> {
    return this.request<AuthResponse>('/users/updatepassword', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    }).then(res => res.data);
  }

  async logout(): Promise<void> {
    await this.request('/users/logout', { method: 'POST' });
    localStorage.removeItem('auth_token');
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>('/dashboard/stats').then(res => res.data);
  }

  // User endpoints
  async getUsers(filters?: FilterOptions): Promise<PaginatedResponse<User>> {
    const queryParams = this.buildQueryString(filters);
    return this.request<PaginatedResponse<User>>(`/users${queryParams}`).then(res => res.data);
  }

  async getUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`).then(res => res.data);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }).then(res => res.data);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }).then(res => res.data);
  }

  async deleteUser(id: string): Promise<void> {
    await this.request(`/users/${id}`, { method: 'DELETE' });
  }

  // Policy endpoints (Insurance Policies)
  async getPolicies(filters?: FilterOptions): Promise<PaginatedResponse<Policy>> {
    const queryParams = this.buildQueryString(filters);
    return this.request<PaginatedResponse<Policy>>(`/policies${queryParams}`).then(res => res.data);
  }

  async getPolicy(id: string): Promise<Policy> {
    return this.request<Policy>(`/policies/${id}`).then(res => res.data);
  }

  async createPolicy(policyData: Partial<Policy>): Promise<Policy> {
    return this.request<Policy>('/policies', {
      method: 'POST',
      body: JSON.stringify(policyData),
    }).then(res => res.data);
  }

  async updatePolicy(id: string, policyData: Partial<Policy>): Promise<Policy> {
    return this.request<Policy>(`/policies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(policyData),
    }).then(res => res.data);
  }

  async deletePolicy(id: string): Promise<void> {
    await this.request(`/policies/${id}`, { method: 'DELETE' });
  }

  async addPayment(policyId: string, paymentData: any): Promise<Policy> {
    return this.request<Policy>(`/policies/${policyId}/payments`, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    }).then(res => res.data);
  }

  async addClaim(policyId: string, claimData: any): Promise<Policy> {
    return this.request<Policy>(`/policies/${policyId}/claims`, {
      method: 'POST',
      body: JSON.stringify(claimData),
    }).then(res => res.data);
  }

  async updateClaimStatus(policyId: string, claimId: string, status: string): Promise<Policy> {
    return this.request<Policy>(`/policies/${policyId}/claims/${claimId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }).then(res => res.data);
  }

  async getPolicyStats(): Promise<any> {
    return this.request<any>('/policies/stats').then(res => res.data);
  }

  private buildQueryString(filters?: FilterOptions): string {
    if (!filters) return '';

    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    if (filters.filters) {
      Object.entries(filters.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }
}

export const apiService = new ApiService();
