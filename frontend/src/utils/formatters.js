export const formatSalary = (min, max) => {
  if (min == null && max == null) return 'Not specified';
  const fmt = (n) => `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `$${fmt(min)} - $${fmt(max)}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const timeAgo = (dateString) => {
  if (!dateString) return '';
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60]
  ];
  for (const [name, secondsInUnit] of units) {
    const value = Math.floor(seconds / secondsInUnit);
    if (value >= 1) return `${value} ${name}${value > 1 ? 's' : ''} ago`;
  }
  return 'just now';
};

export const companyName = (companyUser) =>
  companyUser?.companyName || companyUser?.fullName || 'A company';
