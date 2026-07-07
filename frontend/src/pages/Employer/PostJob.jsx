import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import JobForm from '../../components/jobs/JobForm';
import { createJob } from '../../redux/slices/jobSlice';
import { ROUTES } from '../../routes';

export default function PostJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const result = await dispatch(createJob(values));
    if (createJob.fulfilled.match(result)) {
      toast.success('Job posted successfully');
      navigate(ROUTES.EMPLOYER_MANAGE_JOBS);
    } else {
      toast.error(result.payload || 'Could not post job');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Post a new job</h1>
      <JobForm onSubmit={handleSubmit} submitLabel="Post job" />
    </div>
  );
}
