import React from 'react';
import Input from '../ui/Input';
import { JOB_CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS } from '../../constants';

const selectClass =
  'w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm';

export default function JobFilters({ filters, onChange }) {
  const update = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <div className="card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      <div className="lg:col-span-2">
        <Input placeholder="Search title or description" value={filters.search || ''} onChange={update('search')} />
      </div>
      <Input placeholder="Location" value={filters.location || ''} onChange={update('location')} />

      <select className={selectClass} value={filters.category || ''} onChange={update('category')}>
        <option value="">All categories</option>
        {JOB_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select className={selectClass} value={filters.jobType || ''} onChange={update('jobType')}>
        <option value="">All job types</option>
        {JOB_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        className={`${selectClass} lg:col-span-1`}
        value={filters.experience || ''}
        onChange={update('experience')}
      >
        <option value="">All experience levels</option>
        {EXPERIENCE_LEVELS.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
}
