import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import EmployerLayout from './layouts/EmployerLayout';
import AdminLayout from './layouts/AdminLayout';

import ProtectedRoute from './components/common/ProtectedRoute';
import { ROLES } from './constants';

import Home from './pages/Public/Home';
import Jobs from './pages/Public/Jobs';
import JobDetails from './pages/Public/JobDetails';
import NotFound from './pages/Public/NotFound';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import JobSeekerDashboard from './pages/JobSeeker/Dashboard';
import Profile from './pages/JobSeeker/Profile';
import AppliedJobs from './pages/JobSeeker/AppliedJobs';

import EmployerDashboard from './pages/Employer/Dashboard';
import PostJob from './pages/Employer/PostJob';
import EditJob from './pages/Employer/EditJob';
import ManageJobs from './pages/Employer/ManageJobs';
import JobApplicants from './pages/Employer/JobApplicants';

import AdminDashboard from './pages/Admin/Dashboard';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="job/:id" element={<JobDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Job seeker area */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.JOB_SEEKER]} />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<JobSeekerDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="applied-jobs" element={<AppliedJobs />} />
        </Route>
      </Route>

      {/* Employer area */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.EMPLOYER]} />}>
        <Route path="/employer" element={<EmployerLayout />}>
          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route path="jobs" element={<ManageJobs />} />
          <Route path="jobs/new" element={<PostJob />} />
          <Route path="jobs/:id/edit" element={<EditJob />} />
          <Route path="jobs/:id/applicants" element={<JobApplicants />} />
        </Route>
      </Route>

      {/* Admin area */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
