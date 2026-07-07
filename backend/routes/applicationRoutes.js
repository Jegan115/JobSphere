import express from 'express';
import {
  applyToJob,
  getJobApplications,
  getUserApplications,
  updateApplicationStatus,
  withdrawApplication
} from '../controllers/applicationController.js';
import verifyAuth, { restrictTo } from '../middlewares/auth.js';

const router = express.Router();

// Apply to job (job seekers)
router.post('/:jobId/apply', verifyAuth, restrictTo('jobSeeker'), applyToJob);

// Get user applications (protected)
router.get('/my-applications', verifyAuth, getUserApplications);

// Get job applications (employer only)
router.get('/job/:jobId/applications', verifyAuth, restrictTo('employer'), getJobApplications);

// Update application status (employer only)
router.patch('/:applicationId/status', verifyAuth, restrictTo('employer'), updateApplicationStatus);

// Withdraw application (protected)
router.delete('/:applicationId/withdraw', verifyAuth, withdrawApplication);

export default router;
