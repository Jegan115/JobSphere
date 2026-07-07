import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineDocumentText, HiOutlineCheckCircle, HiOutlineSearch } from 'react-icons/hi';
import StatCard from '../../components/dashboard/StatCard';
import StatusBadge from '../../components/dashboard/StatusBadge';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/common/EmptyState';
import { fetchMyApplications } from '../../redux/slices/applicationSlice';
import { formatDate, companyName } from '../../utils/formatters';
import { ROUTES } from '../../routes';
import useAuth from '../../hooks/useAuth';

export default function JobSeekerDashboard() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { mine, mineStatus } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const shortlisted = mine.filter((a) => a.status === 'shortlisted' || a.status === 'accepted').length;

  if (mineStatus === 'loading') {
    return (
      <div className="py-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Welcome back, {user?.fullName?.split(' ')[0]}</h1>
        <p className="text-sm text-slate-500">Track your applications and discover new roles.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard label="Applications submitted" value={mine.length} icon={<HiOutlineDocumentText />} />
        <StatCard label="Shortlisted / accepted" value={shortlisted} icon={<HiOutlineCheckCircle />} />
      </div>

      <div className="flex gap-3">
        <Link to={ROUTES.JOBS}>
          <Button>
            <HiOutlineSearch className="mr-1" /> Browse jobs
          </Button>
        </Link>
        <Link to={ROUTES.APPLIED_JOBS}>
          <Button variant="outline">View all applications</Button>
        </Link>
      </div>

      <div>
        <h2 className="font-semibold mb-3">Recent applications</h2>
        {mine.length === 0 ? (
          <EmptyState title="You haven't applied to any jobs yet" description="Start browsing to find your next role." />
        ) : (
          <div className="space-y-3">
            {mine.slice(0, 5).map((app) => (
              <div key={app._id} className="card flex items-center justify-between">
                <div>
                  <Link to={ROUTES.JOB_DETAILS(app.jobId?._id)} className="font-medium hover:text-primary">
                    {app.jobId?.title}
                  </Link>
                  <div className="text-sm text-slate-500">
                    {companyName(app.jobId?.companyId)} • Applied {formatDate(app.appliedAt)}
                  </div>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
