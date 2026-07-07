import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineCurrencyDollar } from 'react-icons/hi';
import Avatar from '../ui/Avatar';
import { ROUTES } from '../../routes';
import { formatSalary, timeAgo, companyName } from '../../utils/formatters';

export default function JobCard({ job, actions }) {
  const company = job.companyId;

  return (
    <div className="card flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
      <div className="flex gap-4">
        <Avatar name={companyName(company)} src={company?.profilePicture} size={12} />
        <div>
          <Link to={ROUTES.JOB_DETAILS(job._id)} className="font-semibold text-slate-800 dark:text-slate-100 hover:text-primary">
            {job.title}
          </Link>
          <div className="text-sm text-slate-500">{companyName(company)}</div>

          <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <HiOutlineLocationMarker /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <HiOutlineBriefcase /> {job.jobType}
            </span>
            <span className="inline-flex items-center gap-1">
              <HiOutlineCurrencyDollar /> {formatSalary(job.salaryMin, job.salaryMax)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-slate-400">{timeAgo(job.createdAt)}</span>
        {actions ?? (
          <Link
            to={ROUTES.JOB_DETAILS(job._id)}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md text-sm"
          >
            View job
          </Link>
        )}
      </div>
    </div>
  );
}
