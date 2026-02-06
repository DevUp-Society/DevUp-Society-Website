// API Configuration
// Update BACKEND_URL when deploying to Render/Railway

export const API_CONFIG = {
  // Use environment variable if available, otherwise fall back to local
  BACKEND_URL: import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:3001',
  
  // API Endpoints
  ENDPOINTS: {
    GET_TEAM_NUMBER: '/api/get-team-number',
    REGISTER: '/api/register',
    HEALTH: '/health'
  },
  
  // Request timeout
  TIMEOUT: 30000, // 30 seconds
  
  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000 // 1 second
  }
};

// Helper function to build full URL
export function getApiUrl(endpoint: string): string {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`;
}

// Debug mode (enabled in development)
export const DEBUG = import.meta.env.DEV;

// Logger utility for frontend
export const logger = {
  info: (message: string, data?: any) => {
    if (DEBUG) {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
    }
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
  },
  debug: (message: string, data?: any) => {
    if (DEBUG) {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, data || '');
    }
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '');
  }
};
