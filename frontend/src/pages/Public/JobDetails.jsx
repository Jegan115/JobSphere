import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineClock } from 'react-icons/hi';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import ApplyModal from '../../components/jobs/ApplyModal';
import EmptyState from '../../components/common/EmptyState';
import useAuth from '../../hooks/useAuth';
import { fetchJobById, clearCurrentJob, deleteJob } from '../../redux/slices/jobSlice';
import { formatSalary, formatDate, companyName } from '../../utils/formatters';
import { ROUTES } from '../../routes';
import { ROLES } from '../../constants';

export default function JobDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { current: job, currentStatus, currentError } = useSelector((state) => state.jobs);
  const [showApply, setShowApply] = useState(false);

  useEffect(() => {
    dispatch(fetchJobById(id));
    return () => dispatch(clearCurrentJob());
  }, [dispatch, id]);

  if (currentStatus === 'loading' || currentStatus === 'idle') {
    return (
      <div className="py-16">
        <Loader />
      </div>
    );
  }

  if (currentStatus === 'failed' || !job) {
    return <EmptyState title="Job not found" description={currentError || 'This listing may have been removed.'} />;
  }

  const isOwner = user?._id === job.companyId?._id;

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { state: { from: { pathname: ROUTES.JOB_DETAILS(id) } } });
      return;
    }
    if (user.role !== ROLES.JOB_SEEKER) {
      toast.error('Only job seekers can apply to jobs');
      return;
    }
    setShowApply(true);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this job posting? This cannot be undone.')) return;
    const result = await dispatch(deleteJob(job._id));
    if (deleteJob.fulfilled.match(result)) {
      toast.success('Job deleted');
      navigate(ROUTES.EMPLOYER_MANAGE_JOBS);
    } else {
      toast.error(result.payload || 'Could not delete job');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="card">
        <div className="flex items-start gap-4">
          <Avatar name={companyName(job.companyId)} src={job.companyId?.profilePicture} size={14} />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{job.title}</h1>
            <p className="text-slate-500">{companyName(job.companyId)}</p>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <HiOutlineLocationMarker /> {job.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <HiOutlineBriefcase /> {job.jobType} • {job.experience}
              </span>
              <span className="inline-flex items-center gap-1">
                <HiOutlineClock /> Apply by {formatDate(job.deadline)}
              </span>
            </div>

            <div className="mt-3 text-lg font-semibold text-primary">
              {formatSalary(job.salaryMin, job.salaryMax)}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {isOwner ? (
            <>
              <Link
                to={ROUTES.EMPLOYER_JOB_APPLICANTS(job._id)}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md text-sm"
              >
                View applicants ({job.applicationsCount ?? 0})
              </Link>
              <Button variant="outline" onClick={handleDelete}>
                Delete job
              </Button>
            </>
          ) : (
            <Button onClick={handleApplyClick}>Apply now</Button>
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Job description</h2>
        <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{job.description}</p>

        {job.requiredSkills?.length > 0 && (
          <>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {showApply && <ApplyModal job={job} onClose={() => setShowApply(false)} />}
    </div>
  );
}
