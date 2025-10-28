// API Configuration
export const API_BASE_URL = 'http://localhost:5000';
export const API_VERSION = 'api';

// App Configuration
export const APP_NAME = 'CenasOcta Admin';
export const APP_VERSION = '1.0.0';

// Navigation
export const ROUTES = {
  LOGIN: 'Login',
  DASHBOARD: 'Dashboard',
  USERS: 'Users',
  POLICIES: 'Policies',
  SETTINGS: 'Settings',
  PROFILE: 'Profile',
} as const;

// Colors
export const COLORS = {
  PRIMARY: '#2563eb',
  SECONDARY: '#64748b',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  BACKGROUND: '#ffffff',
  SURFACE: '#f8fafc',
  TEXT: '#1e293b',
  TEXT_MUTED: '#64748b',
  BORDER: '#e2e8f0',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  APP_SETTINGS: '@app_settings',
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  PASSWORD_MIN_LENGTH: 8,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;
