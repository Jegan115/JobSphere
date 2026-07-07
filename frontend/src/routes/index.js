// Centralized route helpers
export const ROUTES = {
  HOME: '/',
  JOBS: '/jobs',
  JOB_DETAILS: (id) => `/job/${id}`,
  LOGIN: '/login',
  REGISTER: '/register',

  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  APPLIED_JOBS: '/applied-jobs',

  EMPLOYER_DASHBOARD: '/employer/dashboard',
  EMPLOYER_POST_JOB: '/employer/jobs/new',
  EMPLOYER_EDIT_JOB: (id) => `/employer/jobs/${id}/edit`,
  EMPLOYER_MANAGE_JOBS: '/employer/jobs',
  EMPLOYER_JOB_APPLICANTS: (id) => `/employer/jobs/${id}/applicants`,

  ADMIN_DASHBOARD: '/admin/dashboard'
};
