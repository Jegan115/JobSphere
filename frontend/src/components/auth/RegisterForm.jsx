import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { registerUser } from '../../redux/slices/authSlice';
import { ROUTES } from '../../routes';
import { ROLES } from '../../constants';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues: { role: ROLES.JOB_SEEKER } });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (values) => {
    const result = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(result)) {
      toast.success('Account created! Welcome to JobSphere.');
      navigate(ROUTES.HOME, { replace: true });
    } else {
      toast.error(result.payload || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label
          className={`cursor-pointer text-center px-3 py-2 rounded-md border text-sm font-medium ${
            watch('role') === ROLES.JOB_SEEKER
              ? 'border-primary text-primary bg-primary/5'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          <input type="radio" value={ROLES.JOB_SEEKER} className="hidden" {...register('role')} />
          I&apos;m a Job Seeker
        </label>
        <label
          className={`cursor-pointer text-center px-3 py-2 rounded-md border text-sm font-medium ${
            watch('role') === ROLES.EMPLOYER
              ? 'border-primary text-primary bg-primary/5'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          <input type="radio" value={ROLES.EMPLOYER} className="hidden" {...register('role')} />
          I&apos;m an Employer
        </label>
      </div>

      <Input
        label="Full name"
        placeholder="Jane Doe"
        error={errors.fullName?.message}
        {...register('fullName', { required: 'Full name is required' })}
      />

      {watch('role') === ROLES.EMPLOYER && (
        <Input
          label="Company name"
          placeholder="Acme Inc."
          error={errors.companyName?.message}
          {...register('companyName')}
        />
      )}

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email', { required: 'Email is required' })}
      />
      <Input
        label="Password"
        type="password"
        placeholder="At least 8 characters, mixed case, number & symbol"
        error={errors.password?.message}
        {...register('password', { required: 'Password is required' })}
      />
      <Input
        label="Confirm password"
        type="password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match'
        })}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>

      <p className="text-sm text-center text-slate-500">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-primary font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
}
