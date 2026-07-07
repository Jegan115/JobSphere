export const ROLES = {
  JOB_SEEKER: 'jobSeeker',
  EMPLOYER: 'employer',
  ADMIN: 'admin'
};

export const JOB_CATEGORIES = [
  'IT',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Other'
];

export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];

export const EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior'];

export const APPLICATION_STATUSES = ['applied', 'shortlisted', 'rejected', 'accepted'];

export const APPLICATION_STATUS_STYLES = {
  applied: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  shortlisted: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
  accepted: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
};
