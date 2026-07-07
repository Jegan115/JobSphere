import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import JobForm from '../../components/jobs/JobForm';
import Loader from '../../components/ui/Loader';
import { fetchJobById, updateJob, clearCurrentJob } from '../../redux/slices/jobSlice';
import { ROUTES } from '../../routes';

export default function EditJob() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current: job, currentStatus } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobById(id));
    return () => dispatch(clearCurrentJob());
  }, [dispatch, id]);

  const handleSubmit = async (values) => {
    const result = await dispatch(updateJob({ id, payload: values }));
    if (updateJob.fulfilled.match(result)) {
      toast.success('Job updated successfully');
      navigate(ROUTES.EMPLOYER_MANAGE_JOBS);
    } else {
      toast.error(result.payload || 'Could not update job');
    }
  };

  if (currentStatus === 'loading' || !job) {
    return (
      <div className="py-12">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit job</h1>
      <JobForm defaultValues={job} onSubmit={handleSubmit} submitLabel="Save changes" />
    </div>
  );
}
