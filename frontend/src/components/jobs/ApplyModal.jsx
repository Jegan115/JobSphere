import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { HiOutlineX } from 'react-icons/hi';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { applyToJob } from '../../redux/slices/applicationSlice';

export default function ApplyModal({ job, onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const result = await dispatch(applyToJob({ jobId: job._id, payload: values }));
    if (applyToJob.fulfilled.match(result)) {
      toast.success('Application submitted!');
      onSuccess?.();
      onClose();
    } else {
      toast.error(result.payload || 'Could not submit your application');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="card w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <HiOutlineX size={20} />
        </button>

        <h3 className="text-lg font-semibold mb-1">Apply to {job.title}</h3>
        <p className="text-sm text-slate-500 mb-4">Submit a link to your resume and an optional note.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Resume URL"
            placeholder="https://drive.google.com/your-resume.pdf"
            error={errors.resume?.message}
            {...register('resume', { required: 'A resume link is required' })}
          />

          <label className="block text-sm">
            <div className="mb-1 text-slate-700 dark:text-slate-200">Cover letter (optional)</div>
            <textarea
              rows={4}
              maxLength={1000}
              placeholder="Why are you a great fit for this role?"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
              {...register('coverLetter')}
            />
          </label>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="w-full" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
