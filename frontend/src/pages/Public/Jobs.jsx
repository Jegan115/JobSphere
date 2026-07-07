import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import JobFilters from '../../components/jobs/JobFilters';
import JobCard from '../../components/jobs/JobCard';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/common/EmptyState';
import { fetchJobs } from '../../redux/slices/jobSlice';

export default function Jobs() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({ search: searchParams.get('search') || '' });
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { list, pagination, listStatus, listError } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs({ ...filters, page, limit: 10 }));
  }, [dispatch, filters, page]);

  const handleFilterChange = (next) => {
    setPage(1);
    setFilters(next);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Browse jobs</h1>

      <JobFilters filters={filters} onChange={handleFilterChange} />

      {listStatus === 'loading' && (
        <div className="py-12">
          <Loader />
        </div>
      )}

      {listStatus === 'failed' && <EmptyState title="Couldn't load jobs" description={listError} />}

      {listStatus === 'succeeded' && list.length === 0 && (
        <EmptyState title="No jobs match your filters" description="Try widening your search." />
      )}

      <div className="space-y-3">
        {list.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="text-sm text-slate-500">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            disabled={page >= pagination.pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
