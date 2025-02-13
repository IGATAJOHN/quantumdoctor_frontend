export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const API_ROUTES = {
  // Auth Routes
  AUTH: {
    DOCTOR_LOGIN: '/api/auth/doctor-login',
    DOCTOR_SIGNUP: '/api/auth/doctor-signup',
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    REFRESH_TOKEN: '/api/auth/token/refresh',
  },
  
  // Vitals Routes
  VITALS: {
    BLOOD_OXYGEN: '/api/vitals/blood_oxygen',
    BLOOD_PRESSURE: '/api/vitals/blood_pressure',
    CHATBOT: '/api/vitals/chatbot',
    GET_VITALS: '/api/vitals/get_vitals',
    GET_VITALS_HISTORY: '/api/vitals/get_vitals_history',
    HEART_RATE: '/api/vitals/heart_rate',
    TEMPERATURE: '/api/vitals/temperature',
    UPDATE_VITALS: '/api/vitals/update_vitals',
  },
  
  // Lab Tests Routes
  LAB_TESTS: {
    DOWNLOAD_RESULT: '/api/lab-tests/download_test_result',
    REQUEST_TEST: '/api/lab-tests/request_test',
    UPLOAD_RESULT: '/api/lab-tests/upload_test_result',
    VIEW_ALL_RESULTS: '/api/lab-tests/view_all_test_results',
    VIEW_RESULTS: '/api/lab-tests/view_test_results',
  },
  
  // Payments Routes
  PAYMENTS: {
    MAKE_PAYMENT: '/api/payments/make_payment',
    PAYMENT_CALLBACK: '/api/payments/payment_callback',
  },
  
  // Consultation Routes
  CONSULTATION: {
    BOOK: '/api/consultation/book_consultation',
    DOCTOR_REQUEST: '/api/consultation/doctor/request',
    DOCTOR_REQUESTS: '/api/consultation/doctor/requests',
    DOCTORS: '/api/consultation/doctors',
    SEARCH_DOCTORS: '/api/consultation/doctors/search',
  },
  
  // Admin Routes
  ADMIN: {
    LOGIN: '/api/admin/admin-login',
    SIGNUP: '/api/admin/admin-signup',
    APPROVE_DOCTOR: '/api/admin/approve-doctor',
    DOCTORS: '/api/admin/doctors',
    UNVERIFIED_DOCTORS: '/api/admin/unverified-doctors',
    VERIFY_DOCTOR: '/api/admin/verify-doctor',
  },
};
