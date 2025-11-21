export const API_ENDPOINTS = {
  // Carbon Calculator
  CALCULATE_CARBON: '/carbon/calculate',
  GET_CALCULATIONS: '/carbon/history',
  GET_CALCULATION_BY_ID: (id) => `/carbon/${id}`,
  
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // User
  GET_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  
  // Reports
  GET_REPORTS: '/reports',
  GENERATE_REPORT: '/reports/generate',
  EXPORT_REPORT: (id) => `/reports/${id}/export`,
};