import api from './api';

export const jobService = {
  getAllJobs: async (params = {}) => {
    const { data } = await api.get('/jobs', { params });
    return data;
  },
  getJobById: async (id) => {
    const { data } = await api.get(`/jobs/${id}`);
    return data;
  },
  createJob: async (payload) => {
    const { data } = await api.post('/jobs', payload);
    return data;
  },
  updateJob: async (id, payload) => {
    const { data } = await api.put(`/jobs/${id}`, payload);
    return data;
  },
  deleteJob: async (id) => {
    const { data } = await api.delete(`/jobs/${id}`);
    return data;
  },
  getEmployerJobs: async () => {
    const { data } = await api.get('/jobs/employer/my-jobs');
    return data;
  }
};

export default jobService;
