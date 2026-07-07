import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobService from '../../services/api/jobService';

export const fetchJobs = createAsyncThunk('jobs/fetchAll', async (params, { rejectWithValue }) => {
  try {
    return await jobService.getAllJobs(params);
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchJobById = createAsyncThunk('jobs/fetchById', async (id, { rejectWithValue }) => {
  try {
    const data = await jobService.getJobById(id);
    return data.job;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchEmployerJobs = createAsyncThunk('jobs/fetchEmployerJobs', async (_, { rejectWithValue }) => {
  try {
    const data = await jobService.getEmployerJobs();
    return data.jobs;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const createJob = createAsyncThunk('jobs/create', async (payload, { rejectWithValue }) => {
  try {
    const data = await jobService.createJob(payload);
    return data.job;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const updateJob = createAsyncThunk('jobs/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const data = await jobService.updateJob(id, payload);
    return data.job;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const deleteJob = createAsyncThunk('jobs/delete', async (id, { rejectWithValue }) => {
  try {
    await jobService.deleteJob(id);
    return id;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const initialState = {
  list: [],
  pagination: { page: 1, limit: 10, total: 0, pages: 0 },
  listStatus: 'idle',
  listError: null,

  current: null,
  currentStatus: 'idle',
  currentError: null,

  employerJobs: [],
  employerJobsStatus: 'idle',
  employerJobsError: null,

  mutationStatus: 'idle',
  mutationError: null
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearCurrentJob: (state) => {
      state.current = null;
      state.currentError = null;
    },
    clearMutationError: (state) => {
      state.mutationError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Browse jobs
      .addCase(fetchJobs.pending, (state) => {
        state.listStatus = 'loading';
        state.listError = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.list = action.payload.jobs;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.listError = action.payload;
      })
      // Job detail
      .addCase(fetchJobById.pending, (state) => {
        state.currentStatus = 'loading';
        state.currentError = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.currentStatus = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.currentStatus = 'failed';
        state.currentError = action.payload;
      })
      // Employer's jobs
      .addCase(fetchEmployerJobs.pending, (state) => {
        state.employerJobsStatus = 'loading';
        state.employerJobsError = null;
      })
      .addCase(fetchEmployerJobs.fulfilled, (state, action) => {
        state.employerJobsStatus = 'succeeded';
        state.employerJobs = action.payload;
      })
      .addCase(fetchEmployerJobs.rejected, (state, action) => {
        state.employerJobsStatus = 'failed';
        state.employerJobsError = action.payload;
      })
      // Create
      .addCase(createJob.pending, (state) => {
        state.mutationStatus = 'loading';
        state.mutationError = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.employerJobs.unshift(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.mutationError = action.payload;
      })
      // Update
      .addCase(updateJob.fulfilled, (state, action) => {
        state.employerJobs = state.employerJobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        );
        if (state.current?._id === action.payload._id) {
          state.current = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.mutationError = action.payload;
      })
      // Delete
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.employerJobs = state.employerJobs.filter((job) => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.mutationError = action.payload;
      });
  }
});

export const { clearCurrentJob, clearMutationError } = jobSlice.actions;
export default jobSlice.reducer;
