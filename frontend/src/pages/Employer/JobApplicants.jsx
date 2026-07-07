import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Avatar from '../../components/ui/Avatar';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/common/EmptyState';
import StatusBadge from '../../components/dashboard/StatusBadge';
import { fetchJobApplicants, updateApplicationStatus } from '../../redux/slices/applicationSlice';
import { formatDate } from '../../utils/formatters';
import { APPLICATION_STATUSES } from '../../constants';

export default function JobApplicants() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants, applicantsStatus, applicantsError } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchJobApplicants(id));
  }, [dispatch, id]);

  const handleStatusChange = async (applicationId, status) => {
    const result = await dispatch(updateApplicationStatus({ applicationId, status }));
    if (updateApplicationStatus.fulfilled.match(result)) {
      toast.success('Status updated');
    } else {
      toast.error(result.payload || 'Could not update status');
    }
  };

  if (applicantsStatus === 'loading') {
    return (
      <div className="py-12">
        <Loader />
      </div>
    );
  }

  if (applicantsStatus === 'failed') {
    return <EmptyState title="Couldn't load applicants" description={applicantsError} />;
  }

  if (applicants.length === 0) {
    return <EmptyState title="No applicants yet" description="Check back once candidates start applying." />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Applicants ({applicants.length})</h1>

      <div className="space-y-3">
        {applicants.map((app) => {
          const applicant = app.applicantId;
          return (
            <div key={app._id} className="card flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div className="flex gap-4">
                <Avatar name={applicant?.fullName} src={applicant?.profilePicture} size={12} />
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-100">{applicant?.fullName}</div>
                  <div className="text-sm text-slate-500">{applicant?.email}</div>
                  {applicant?.skills?.length > 0 && (
                    <div className="mt-1 text-xs text-slate-400">{applicant.skills.join(', ')}</div>
                  )}
                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary font-medium mt-1 inline-block"
                  >
                    View resume
                  </a>
                  <div className="text-xs text-slate-400 mt-1">Applied {formatDate(app.appliedAt)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={app.status} />
                <select
                  className="text-sm border rounded-md px-2 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                >
                  {APPLICATION_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
