import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import JobCard from '../../components/jobs/JobCard';
import EmptyState from '../../components/common/EmptyState';
import { fetchJobs } from '../../redux/slices/jobSlice';
import { ROUTES } from '../../routes';

export default function Home() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, listStatus } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs({ limit: 5 }));
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(search ? `${ROUTES.JOBS}?search=${encodeURIComponent(search)}` : ROUTES.JOBS);
  };

  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100">
          Find your next role on <span className="text-primary">JobSphere</span>
        </h1>
        <p className="mt-3 text-slate-500 max-w-xl mx-auto">
          Search thousands of jobs from real companies, and apply in a couple of clicks.
        </p>

        <form onSubmit={handleSearch} className="mt-6 max-w-lg mx-auto flex gap-3">
          <Input
            placeholder="Job title, keyword, or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>
      </motion.section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recently posted</h2>
          <Button variant="outline" onClick={() => navigate(ROUTES.JOBS)}>
            Browse all jobs
          </Button>
        </div>

        {listStatus === 'loading' && (
          <div className="py-8">
            <Loader />
          </div>
        )}

        {listStatus === 'succeeded' && list.length === 0 && (
          <EmptyState title="No jobs posted yet" description="Check back soon, or post the first one." />
        )}

        <div className="space-y-3">
          {list.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
