import express from 'express';
import { register, login, logout, getCurrentUser } from '../controllers/authController.js';
import verifyAuth from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', verifyAuth, getCurrentUser);

export default router;
