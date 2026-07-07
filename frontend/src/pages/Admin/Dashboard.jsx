import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineBriefcase, HiOutlineOfficeBuilding } from 'react-icons/hi';
import StatCard from '../../components/dashboard/StatCard';
import Loader from '../../components/ui/Loader';
import JobCard from '../../components/jobs/JobCard';
import { fetchJobs } from '../../redux/slices/jobSlice';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { list, pagination, listStatus } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs({ limit: 10 }));
  }, [dispatch]);

  const uniqueCompanies = new Set(list.map((job) => job.companyId?._id)).size;

  if (listStatus === 'loading') {
    return (
      <div className="py-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Platform overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard label="Active jobs" value={pagination.total} icon={<HiOutlineBriefcase />} />
        <StatCard label="Companies (recent page)" value={uniqueCompanies} icon={<HiOutlineOfficeBuilding />} />
      </div>

      <div>
        <h2 className="font-semibold mb-3">Most recent jobs</h2>
        <div className="space-y-3">
          {list.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-400">
        User management and job moderation aren't available yet — the backend doesn't have admin-specific
        endpoints (e.g. list/deactivate users, moderate job posts). Happy to help you add those routes and
        controllers next.
      </p>
    </div>
  );
}
