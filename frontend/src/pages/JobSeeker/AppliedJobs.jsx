import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/common/EmptyState';
import StatusBadge from '../../components/dashboard/StatusBadge';
import { fetchMyApplications, withdrawApplication } from '../../redux/slices/applicationSlice';
import { formatDate, companyName } from '../../utils/formatters';
import { ROUTES } from '../../routes';

export default function AppliedJobs() {
  const dispatch = useDispatch();
  const { mine, mineStatus, mineError } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const handleWithdraw = async (id) => {
    if (!window.confirm('Withdraw this application?')) return;
    const result = await dispatch(withdrawApplication(id));
    if (withdrawApplication.fulfilled.match(result)) {
      toast.success('Application withdrawn');
    } else {
      toast.error(result.payload || 'Could not withdraw application');
    }
  };

  if (mineStatus === 'loading') {
    return (
      <div className="py-12">
        <Loader />
      </div>
    );
  }

  if (mineStatus === 'failed') {
    return <EmptyState title="Couldn't load applications" description={mineError} />;
  }

  if (mine.length === 0) {
    return (
      <EmptyState
        title="No applications yet"
        description="Jobs you apply to will show up here."
      />
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Your applications ({mine.length})</h1>

      <div className="space-y-3">
        {mine.map((app) => (
          <div key={app._id} className="card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <Link to={ROUTES.JOB_DETAILS(app.jobId?._id)} className="font-medium hover:text-primary">
                {app.jobId?.title}
              </Link>
              <div className="text-sm text-slate-500">
                {companyName(app.jobId?.companyId)} • {app.jobId?.location}
              </div>
              <div className="text-xs text-slate-400 mt-1">Applied {formatDate(app.appliedAt)}</div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge status={app.status} />
              {app.status === 'applied' && (
                <button
                  onClick={() => handleWithdraw(app._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Withdraw
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
