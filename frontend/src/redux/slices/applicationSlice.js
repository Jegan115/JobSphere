import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicationService from '../../services/api/applicationService';

export const applyToJob = createAsyncThunk(
  'applications/apply',
  async ({ jobId, payload }, { rejectWithValue }) => {
    try {
      const data = await applicationService.applyToJob(jobId, payload);
      return data.application;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMine',
  async (_, { rejectWithValue }) => {
    try {
      const data = await applicationService.getMyApplications();
      return data.applications;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchJobApplicants = createAsyncThunk(
  'applications/fetchJobApplicants',
  async (jobId, { rejectWithValue }) => {
    try {
      const data = await applicationService.getJobApplications(jobId);
      return data.applications;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const data = await applicationService.updateApplicationStatus(applicationId, status);
      return data.application;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const withdrawApplication = createAsyncThunk(
  'applications/withdraw',
  async (applicationId, { rejectWithValue }) => {
    try {
      await applicationService.withdrawApplication(applicationId);
      return applicationId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  mine: [],
  mineStatus: 'idle',
  mineError: null,

  applicants: [],
  applicantsStatus: 'idle',
  applicantsError: null,

  applyStatus: 'idle',
  applyError: null
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    clearApplyStatus: (state) => {
      state.applyStatus = 'idle';
      state.applyError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Apply
      .addCase(applyToJob.pending, (state) => {
        state.applyStatus = 'loading';
        state.applyError = null;
      })
      .addCase(applyToJob.fulfilled, (state) => {
        state.applyStatus = 'succeeded';
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.applyStatus = 'failed';
        state.applyError = action.payload;
      })
      // My applications
      .addCase(fetchMyApplications.pending, (state) => {
        state.mineStatus = 'loading';
        state.mineError = null;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.mineStatus = 'succeeded';
        state.mine = action.payload;
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.mineStatus = 'failed';
        state.mineError = action.payload;
      })
      // Applicants for a job (employer view)
      .addCase(fetchJobApplicants.pending, (state) => {
        state.applicantsStatus = 'loading';
        state.applicantsError = null;
      })
      .addCase(fetchJobApplicants.fulfilled, (state, action) => {
        state.applicantsStatus = 'succeeded';
        state.applicants = action.payload;
      })
      .addCase(fetchJobApplicants.rejected, (state, action) => {
        state.applicantsStatus = 'failed';
        state.applicantsError = action.payload;
      })
      // Update status
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.applicants = state.applicants.map((app) =>
          app._id === action.payload._id ? action.payload : app
        );
      })
      // Withdraw
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        state.mine = state.mine.filter((app) => app._id !== action.payload);
      });
  }
});

export const { clearApplyStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
