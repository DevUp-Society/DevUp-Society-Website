// Registration Client Logic - Production Ready
// This file contains all client-side logic for the event registration page

import { API_CONFIG, getApiUrl, logger } from '../config/api';

// ============================================
// TYPES & INTERFACES
// ============================================
export interface RegistrationFormData {
  event_slug: string;
  event_name: string;
  team_name: string;
  lead_name: string;
  lead_email: string;
  lead_phone: string;
  lead_college: string;
  team_number: string;
  team_size: number;
  payment_amount: number;
  transaction_id?: string;
  members: TeamMember[];
}

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

export interface RegistrationResponse {
  success: boolean;
  registrationId: string;
  teamNumber: string;
  teamName: string;
  leadName: string;
  leadEmail: string;
  teamSize: number;
  paymentAmount: number;
  transactionId?: string;
  requestId: string;
}

// ============================================
// CONSTANTS
// ============================================
const UPI_ID = 'aliffaizan1212@oksbi';
const UPI_PAYEE = 'DevUp Society';
const MIN_TEAM_SIZE = 2;
const MAX_TEAM_SIZE = 4;

// ============================================
// API FUNCTIONS WITH RETRY LOGIC
// ============================================

/**
 * Fetch with timeout and retry logic
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = API_CONFIG.RETRY.MAX_ATTEMPTS
): Promise<Response> {
  logger.debug('Fetching with retry', { url, retries });
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logger.debug(`Fetch attempt ${attempt}/${retries}`, { url });
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      
      logger.debug(`Fetch response received`, {
        url,
        status: response.status,
        ok: response.ok,
        attempt
      });
      
      return response;
      
    } catch (error) {
      logger.error(`Fetch attempt ${attempt} failed`, { url, error });
      
      if (attempt === retries) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY.DELAY * attempt));
    }
  }
  
  throw new Error('Failed after maximum retry attempts');
}

/**
 * Get next team number from backend
 */
export async function getNextTeamNumber(eventSlug: string): Promise<string> {
  logger.info('Fetching team number', { eventSlug });
  
  try {
    const url = `${getApiUrl(API_CONFIG.ENDPOINTS.GET_TEAM_NUMBER)}?slug=${encodeURIComponent(eventSlug)}`;
    const response = await fetchWithRetry(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      logger.error('Failed to fetch team number', { status: response.status, errorData });
      throw new Error(errorData.error || 'Failed to fetch team number');
    }
    
    const data = await response.json();
    logger.info('Team number received', { teamNumber: data.teamNumber, requestId: data.requestId });
    
    return data.teamNumber || 'DEV2026-001';
    
  } catch (error) {
    logger.error('Error fetching team number', error);
    // Return fallback team number
    return 'DEV2026-001';
  }
}

/**
 * Submit registration to backend
 */
export async function submitRegistration(formData: RegistrationFormData): Promise<RegistrationResponse> {
  logger.info('Submitting registration', {
    teamName: formData.team_name,
    teamSize: formData.team_size,
    eventSlug: formData.event_slug
  });
  
  try {
    const url = getApiUrl(API_CONFIG.ENDPOINTS.REGISTER);
    const response = await fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      logger.error('Registration failed', {
        status: response.status,
        error: responseData
      });
      throw new Error(responseData.error || responseData.message || 'Registration failed');
    }
    
    logger.info('Registration successful', {
      registrationId: responseData.registrationId,
      teamNumber: responseData.teamNumber,
      requestId: responseData.requestId
    });
    
    return responseData;
    
  } catch (error) {
    logger.error('Error submitting registration', error);
    throw error;
  }
}

// ============================================
// PAYMENT UTILITIES
// ============================================

/**
 * Build UPI payment link
 */
export function buildUpiLink(amount: number, teamNumber: string): string {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE,
    am: amount.toString(),
    cu: 'INR',
    tn: teamNumber
  });
  
  const upiLink = `upi://pay?${params.toString()}`;
  logger.debug('Built UPI link', { amount, teamNumber });
  
  return upiLink;
}

/**
 * Generate QR code URL for UPI payment
 */
export function getQRCodeUrl(upiLink: string): string {
  const encoded = encodeURIComponent(upiLink);
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encoded}`;
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// ============================================
// FORM VALIDATION
// ============================================

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (10 digits)
 */
export function validatePhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return /^[0-9]{10}$/.test(cleanPhone);
}

/**
 * Validate team size
 */
export function validateTeamSize(size: number): boolean {
  return size >= MIN_TEAM_SIZE && size <= MAX_TEAM_SIZE;
}

/**
 * Validate form data before submission
 */
export function validateFormData(formData: RegistrationFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!formData.team_name?.trim()) {
    errors.push('Team name is required');
  }
  
  if (!formData.lead_name?.trim()) {
    errors.push('Lead name is required');
  }
  
  if (!formData.lead_email?.trim()) {
    errors.push('Lead email is required');
  } else if (!validateEmail(formData.lead_email)) {
    errors.push('Lead email is invalid');
  }
  
  if (!formData.lead_phone?.trim()) {
    errors.push('Lead phone is required');
  } else if (!validatePhone(formData.lead_phone)) {
    errors.push('Lead phone must be a valid 10-digit number');
  }
  
  if (!formData.lead_college?.trim()) {
    errors.push('College name is required');
  }
  
  if (!validateTeamSize(formData.team_size)) {
    errors.push(`Team size must be between ${MIN_TEAM_SIZE} and ${MAX_TEAM_SIZE}`);
  }
  
  // Validate team members
  formData.members.forEach((member, index) => {
    if (!member.name?.trim()) {
      errors.push(`Member ${index + 2} name is required`);
    }
    if (!member.email?.trim()) {
      errors.push(`Member ${index + 2} email is required`);
    } else if (!validateEmail(member.email)) {
      errors.push(`Member ${index + 2} email is invalid`);
    }
    if (!member.phone?.trim()) {
      errors.push(`Member ${index + 2} phone is required`);
    } else if (!validatePhone(member.phone)) {
      errors.push(`Member ${index + 2} phone must be a valid 10-digit number`);
    }
  });
  
  // Validate transaction ID if payment required
  if (formData.payment_amount > 0 && !formData.transaction_id?.trim()) {
    errors.push('Transaction ID is required for paid events');
  }
  
  logger.debug('Form validation result', { valid: errors.length === 0, errors });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// ============================================
// DOM HELPER FUNCTIONS
// ============================================

/**
 * Show element
 */
export function showElement(element: HTMLElement | null) {
  if (element) {
    element.classList.remove('hidden');
  }
}

/**
 * Hide element
 */
export function hideElement(element: HTMLElement | null) {
  if (element) {
    element.classList.add('hidden');
  }
}

/**
 * Set element text content safely
 */
export function setTextContent(element: HTMLElement | null, text: string) {
  if (element) {
    element.textContent = text;
  }
}

/**
 * Show loading overlay
 */
export function showLoading(overlay: HTMLElement | null) {
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    logger.debug('Loading overlay shown');
  }
}

/**
 * Hide loading overlay
 */
export function hideLoading(overlay: HTMLElement | null) {
  if (overlay) {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    logger.debug('Loading overlay hidden');
  }
}

/**
 * Show error message to user
 */
export function showError(message: string, errors?: string[]) {
  logger.error('Showing error to user', { message, errors });
  
  let errorText = message;
  if (errors && errors.length > 0) {
    errorText += '\n\n' + errors.map(e => `• ${e}`).join('\n');
  }
  
  alert(errorText);
}

/**
 * Extract form data from FormData object
 */
export function extractFormData(formData: FormData, teamSize: number): RegistrationFormData {
  const members: TeamMember[] = [];
  
  // Extract team members (member 2 to teamSize)
  for (let i = 2; i <= teamSize; i++) {
    const name = formData.get(`member_${i}_name`) as string;
    const email = formData.get(`member_${i}_email`) as string;
    const phone = formData.get(`member_${i}_phone`) as string;
    
    if (name || email || phone) {
      members.push({ name, email, phone });
    }
  }
  
  const data: RegistrationFormData = {
    event_slug: formData.get('event_slug') as string,
    event_name: formData.get('event_name') as string,
    team_name: formData.get('team_name') as string,
    lead_name: formData.get('lead_name') as string,
    lead_email: formData.get('lead_email') as string,
    lead_phone: formData.get('lead_phone') as string,
    lead_college: formData.get('lead_college') as string,
    team_number: formData.get('team_number') as string,
    team_size: teamSize,
    payment_amount: parseInt(formData.get('payment_amount') as string) || 0,
    transaction_id: formData.get('transaction_id') as string || undefined,
    members
  };
  
  logger.debug('Extracted form data', { ...data, transaction_id: '***' });
  
  return data;
}

logger.info('Registration client module loaded', {
  backendUrl: API_CONFIG.BACKEND_URL,
  debug: API_CONFIG.BACKEND_URL.includes('localhost')
});
