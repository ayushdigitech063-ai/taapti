// Central API Base URL Configuration
// Change the NEXT_PUBLIC_USE_LOCAL_API variable in .env.local to switch between local and live endpoints
const isLocal = process.env.NEXT_PUBLIC_USE_LOCAL_API === 'true';

export const API_BASE_URL = isLocal 
  ? process.env.NEXT_PUBLIC_LOCAL_API_URL || "http://localhost:5000"
  : process.env.NEXT_PUBLIC_LIVE_API_URL || "https://taap-backend.onrender.com";

// Endpoints Helper Map
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  VERIFY: `${API_BASE_URL}/api/auth/verify`,

  // Contact & Leads
  CONTACT: `${API_BASE_URL}/api/contact`,
  QUICK_ENQUIRY: `${API_BASE_URL}/api/quick-enquiry`,
  CAREERS: `${API_BASE_URL}/api/careers`,
  APPLICATIONS: `${API_BASE_URL}/api/careers/applications`,

  // CMS Endpoints
  BLOGS: `${API_BASE_URL}/api/blogs`,
  CASE_STUDIES: `${API_BASE_URL}/api/case-studies`,
  SERVICES: `${API_BASE_URL}/api/services`,
  INDUSTRIES: `${API_BASE_URL}/api/industries`,
  SETTINGS: `${API_BASE_URL}/api/settings`,
  HOME_HERO: `${API_BASE_URL}/api/home-hero`,
  SERVICES_SECTION: `${API_BASE_URL}/api/services-section`,
  PARTNERS_SECTION: `${API_BASE_URL}/api/partners-section`,
};

export default API_BASE_URL;
