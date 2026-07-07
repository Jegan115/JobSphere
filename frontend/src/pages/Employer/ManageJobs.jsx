import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import JobCard from '../../components/jobs/JobCard';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/common/EmptyState';
import { fetchEmployerJobs, deleteJob } from '../../redux/slices/jobSlice';
import { ROUTES } from '../../routes';

export default function ManageJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employerJobs, employerJobsStatus } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchEmployerJobs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job posting? This cannot be undone.')) return;
    const result = await dispatch(deleteJob(id));
    if (deleteJob.fulfilled.match(result)) {
      toast.success('Job deleted');
    } else {
      toast.error(result.payload || 'Could not delete job');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your job postings</h1>
        <Button onClick={() => navigate(ROUTES.EMPLOYER_POST_JOB)}>Post a job</Button>
      </div>

      {employerJobsStatus === 'loading' && (
        <div className="py-8">
          <Loader />
        </div>
      )}

      {employerJobsStatus === 'succeeded' && employerJobs.length === 0 && (
        <EmptyState
          title="You haven't posted any jobs yet"
          description="Post your first job to start receiving applications."
          action={<Button onClick={() => navigate(ROUTES.EMPLOYER_POST_JOB)}>Post a job</Button>}
        />
      )}

      <div className="space-y-3">
        {employerJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            actions={
              <div className="flex flex-wrap gap-2">
                <Link
                  to={ROUTES.EMPLOYER_JOB_APPLICANTS(job._id)}
                  className="text-sm px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  Applicants ({job.applicationsCount ?? 0})
                </Link>
                <Link
                  to={ROUTES.EMPLOYER_EDIT_JOB(job._id)}
                  className="text-sm px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-sm px-3 py-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                >
                  Delete
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
