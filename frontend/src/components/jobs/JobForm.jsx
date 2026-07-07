import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { JOB_CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS } from '../../constants';

const selectClass =
  'w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100';

const toDateInputValue = (date) => (date ? new Date(date).toISOString().slice(0, 10) : '');

export default function JobForm({ defaultValues, onSubmit, submitLabel = 'Post job' }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      category: JOB_CATEGORIES[0],
      jobType: JOB_TYPES[0],
      experience: EXPERIENCE_LEVELS[0],
      salaryMin: '',
      salaryMax: '',
      requiredSkills: '',
      deadline: '',
      ...defaultValues,
      requiredSkills: Array.isArray(defaultValues?.requiredSkills)
        ? defaultValues.requiredSkills.join(', ')
        : defaultValues?.requiredSkills || '',
      deadline: toDateInputValue(defaultValues?.deadline)
    }
  });

  const submit = (values) => {
    onSubmit({
      ...values,
      salaryMin: Number(values.salaryMin),
      salaryMax: Number(values.salaryMax),
      requiredSkills: values.requiredSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <Input
        label="Job title"
        placeholder="Senior Frontend Engineer"
        error={errors.title?.message}
        {...register('title', { required: 'Title is required' })}
      />

      <label className="block text-sm">
        <div className="mb-1 text-slate-700 dark:text-slate-200">Description</div>
        <textarea
          rows={6}
          placeholder="Responsibilities, requirements, and what makes this role great..."
          className={selectClass}
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 20, message: 'Description must be at least 20 characters' }
          })}
        />
        {errors.description && <div className="mt-1 text-xs text-red-500">{errors.description.message}</div>}
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Location"
          placeholder="Remote, or city name"
          error={errors.location?.message}
          {...register('location', { required: 'Location is required' })}
        />

        <label className="block text-sm">
          <div className="mb-1 text-slate-700 dark:text-slate-200">Category</div>
          <select className={selectClass} {...register('category', { required: true })}>
            {JOB_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <div className="mb-1 text-slate-700 dark:text-slate-200">Job type</div>
          <select className={selectClass} {...register('jobType', { required: true })}>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <div className="mb-1 text-slate-700 dark:text-slate-200">Experience level</div>
          <select className={selectClass} {...register('experience', { required: true })}>
            {EXPERIENCE_LEVELS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>

        <Input
          label="Minimum salary (USD)"
          type="number"
          error={errors.salaryMin?.message}
          {...register('salaryMin', { required: 'Minimum salary is required', min: 0 })}
        />
        <Input
          label="Maximum salary (USD)"
          type="number"
          error={errors.salaryMax?.message}
          {...register('salaryMax', { required: 'Maximum salary is required', min: 0 })}
        />

        <Input
          label="Application deadline"
          type="date"
          error={errors.deadline?.message}
          {...register('deadline', { required: 'Deadline is required' })}
        />
      </div>

      <Input
        label="Required skills (comma-separated)"
        placeholder="React, Node.js, MongoDB"
        {...register('requiredSkills')}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
}
