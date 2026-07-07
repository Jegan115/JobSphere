import api from './api';

export const applicationService = {
  applyToJob: async (jobId, payload) => {
    const { data } = await api.post(`/applications/${jobId}/apply`, payload);
    return data;
  },
  getMyApplications: async () => {
    const { data } = await api.get('/applications/my-applications');
    return data;
  },
  getJobApplications: async (jobId) => {
    const { data } = await api.get(`/applications/job/${jobId}/applications`);
    return data;
  },
  updateApplicationStatus: async (applicationId, status) => {
    const { data } = await api.patch(`/applications/${applicationId}/status`, { status });
    return data;
  },
  withdrawApplication: async (applicationId) => {
    const { data } = await api.delete(`/applications/${applicationId}/withdraw`);
    return data;
  }
};

export default applicationService;
