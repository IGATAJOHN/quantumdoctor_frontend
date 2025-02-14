export const ROUTES = {
  // Public Routes
  PUBLIC: {
    HOME: '/',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ABOUT: '/about',
    CONTACT: '/contact',
    TERMS: '/terms',
    PRIVACY: '/privacy',
    ERROR: '/500',
    NOT_FOUND: '/404'
  },

  // User/Patient Routes
  USER: {
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    APPOINTMENTS: '/appointments',
    NEW_APPOINTMENT: '/appointments/new',
    VIEW_APPOINTMENT: (id: string) => `/appointments/${id}`,
    LAB_TESTS: '/lab-tests',
    NEW_LAB_TEST: '/lab-tests/new',
    VIEW_LAB_TEST: (id: string) => `/lab-tests/${id}`,
    CONSULTATIONS: '/consultations',
    MEDICAL_RECORDS: '/medical-records',
    PRESCRIPTIONS: '/prescriptions',
    VIEW_PRESCRIPTION: (id: string) => `/prescriptions/${id}`,
    VITALS: '/vitals',
    SETTINGS: '/settings'
  },

  // Doctor Routes
  DOCTOR: {
    DASHBOARD: '/doctor/dashboard',
    PROFILE: '/doctor/profile',
    APPOINTMENTS: '/doctor/appointments',
    VIEW_APPOINTMENT: (id: string) => `/doctor/appointments/${id}`,
    PATIENTS: '/doctor/patients',
    VIEW_PATIENT: (id: string) => `/doctor/patients/${id}`,
    SCHEDULE: '/doctor/schedule',
    CONSULTATIONS: '/doctor/consultations',
    PRESCRIPTIONS: '/doctor/prescriptions',
    NEW_PRESCRIPTION: '/doctor/prescriptions/new',
    VIEW_PRESCRIPTION: (id: string) => `/doctor/prescriptions/${id}`,
    SETTINGS: '/doctor/settings'
  },

  // Admin Routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    DOCTORS: '/admin/doctors',
    VIEW_DOCTOR: (id: string) => `/admin/doctors/${id}`,
    PATIENTS: '/admin/patients',
    VIEW_PATIENT: (id: string) => `/admin/patients/${id}`,
    APPOINTMENTS: '/admin/appointments',
    REPORTS: '/admin/reports',
    SETTINGS: '/admin/settings',
    UNVERIFIED_DOCTORS: '/admin/unverified-doctors'
  },

  // API Routes
  API: {
    AUTH: {
      LOGIN: '/api/auth/login',
      SIGNUP: '/api/auth/signup',
      LOGOUT: '/api/auth/logout',
      REFRESH_TOKEN: '/api/auth/refresh',
      FORGOT_PASSWORD: '/api/auth/forgot-password',
      RESET_PASSWORD: '/api/auth/reset-password',
      VERIFY_EMAIL: '/api/auth/verify-email'
    },
    USER: {
      PROFILE: '/api/user/profile',
      UPDATE_PROFILE: '/api/user/update-profile',
      CHANGE_PASSWORD: '/api/user/change-password',
      UPLOAD_AVATAR: '/api/user/upload-avatar'
    },
    DOCTOR: {
      PROFILE: '/api/doctor/profile',
      UPDATE_PROFILE: '/api/doctor/update-profile',
      VERIFY: '/api/doctor/verify',
      SCHEDULE: '/api/doctor/schedule',
      UPDATE_SCHEDULE: '/api/doctor/update-schedule',
      APPOINTMENTS: '/api/doctor/appointments',
      PATIENTS: '/api/doctor/patients',
      STATS: '/api/doctor/stats',
      GET_APPOINTMENT: (id: string) => `/api/doctor/appointments/${id}`,
      GET_PATIENT: (id: string) => `/api/doctor/patients/${id}`,
      UPDATE_APPOINTMENT: (id: string) => `/api/doctor/appointments/${id}`,
      CREATE_PRESCRIPTION: '/api/doctor/prescriptions/create'
    },
    ADMIN: {
      VERIFY_DOCTOR: '/api/admin/verify-doctor',
      GET_STATS: '/api/admin/stats',
      GET_REPORTS: '/api/admin/reports',
      UNVERIFIED_DOCTORS: '/api/admin/unverified-doctors',
      GET_DOCTOR: (id: string) => `/api/admin/doctors/${id}`,
      GET_PATIENT: (id: string) => `/api/admin/patients/${id}`,
      GET_APPOINTMENTS: '/api/admin/appointments',
      UPDATE_SETTINGS: '/api/admin/settings/update'
    },
    APPOINTMENTS: {
      CREATE: '/api/appointments/create',
      UPDATE: '/api/appointments/update',
      DELETE: '/api/appointments/delete',
      LIST: '/api/appointments/list',
      GET: (id: string) => `/api/appointments/${id}`
    },
    LAB_TESTS: {
      CREATE: '/api/lab-tests/create',
      UPDATE: '/api/lab-tests/update',
      DELETE: '/api/lab-tests/delete',
      LIST: '/api/lab-tests/list',
      GET: (id: string) => `/api/lab-tests/${id}`,
      UPLOAD_RESULT: '/api/lab-tests/upload-result'
    },
    PRESCRIPTIONS: {
      CREATE: '/api/prescriptions/create',
      UPDATE: '/api/prescriptions/update',
      DELETE: '/api/prescriptions/delete',
      LIST: '/api/prescriptions/list',
      GET: (id: string) => `/api/prescriptions/${id}`
    },
    VITALS: {
      UPDATE: '/api/vitals/update',
      GET_HISTORY: '/api/vitals/history',
      GET_LATEST: '/api/vitals/latest'
    }
  }
} as const;

// Helper functions
export const getPublicPaths = (): string[] => {
  return Object.values(ROUTES.PUBLIC).filter(route => typeof route === 'string') as string[];
};

export const getUserPaths = (): string[] => {
  return Object.values(ROUTES.USER)
    .filter(route => typeof route === 'string') as string[];
};

export const getDoctorPaths = (): string[] => {
  return Object.values(ROUTES.DOCTOR)
    .filter(route => typeof route === 'string') as string[];
};

export const getAdminPaths = (): string[] => {
  return Object.values(ROUTES.ADMIN)
    .filter(route => typeof route === 'string') as string[];
};

export const isPublicPath = (path: string): boolean => {
  return getPublicPaths().some(route => path === route || path.startsWith(route + '/'));
};

export const isProtectedPath = (path: string): boolean => {
  return [
    ...getUserPaths(),
    ...getDoctorPaths(),
    ...getAdminPaths()
  ].some(route => path === route || path.startsWith(route + '/'));
};

export const hasRouteAccess = (path: string, role?: 'user' | 'doctor' | 'admin'): boolean => {
  if (!role) return false;

  switch (role) {
    case 'user':
      return getUserPaths().some(route => path === route || path.startsWith(route + '/'));
    case 'doctor':
      return getDoctorPaths().some(route => path === route || path.startsWith(route + '/'));
    case 'admin':
      return getAdminPaths().some(route => path === route || path.startsWith(route + '/'));
    default:
      return false;
  }
};
