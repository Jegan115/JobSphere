import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineBriefcase, HiOutlineUserGroup, HiOutlinePlusCircle } from 'react-icons/hi';
import StatCard from '../../components/dashboard/StatCard';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import { fetchEmployerJobs } from '../../redux/slices/jobSlice';
import { ROUTES } from '../../routes';
import useAuth from '../../hooks/useAuth';

export default function EmployerDashboard() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { employerJobs, employerJobsStatus } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchEmployerJobs());
  }, [dispatch]);

  const totalApplicants = employerJobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0);
  const activeJobs = employerJobs.filter((job) => job.isActive).length;

  if (employerJobsStatus === 'loading') {
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
        <p className="text-sm text-slate-500">Here's what's happening with your job postings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Active jobs" value={activeJobs} icon={<HiOutlineBriefcase />} />
        <StatCard label="Total jobs posted" value={employerJobs.length} icon={<HiOutlineBriefcase />} />
        <StatCard label="Total applicants" value={totalApplicants} icon={<HiOutlineUserGroup />} />
      </div>

      <div className="flex gap-3">
        <Link to={ROUTES.EMPLOYER_POST_JOB}>
          <Button>
            <HiOutlinePlusCircle className="mr-1" /> Post a job
          </Button>
        </Link>
        <Link to={ROUTES.EMPLOYER_MANAGE_JOBS}>
          <Button variant="outline">Manage jobs</Button>
        </Link>
      </div>
    </div>
  );
}
