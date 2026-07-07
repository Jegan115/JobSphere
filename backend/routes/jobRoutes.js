import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getEmployerJobs
} from '../controllers/jobController.js';
import verifyAuth, { restrictTo } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);

// Employer-only routes (defined before the dynamic '/:id' route so they don't get shadowed)
router.get('/employer/my-jobs', verifyAuth, restrictTo('employer'), getEmployerJobs);
router.post('/', verifyAuth, restrictTo('employer'), createJob);
router.put('/:id', verifyAuth, restrictTo('employer'), updateJob);
router.delete('/:id', verifyAuth, restrictTo('employer'), deleteJob);

// Public route (kept after the specific routes above)
router.get('/:id', getJobById);

export default router;
