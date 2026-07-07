// Import dependencies
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';


// Import routes and config
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import connectDB from './config/database.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// Load environment variables
dotenv.config();
















// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ============ SECURITY MIDDLEWARE ============
// Helmet: Secure HTTP headers
app.use(helmet());

// CORS: Prevent unauthorized cross-origin requests
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Rate limiting: Prevent DDoS/brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// ============ BODY PARSING & COOKIE MIDDLEWARE ============
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// ============ LOGGING MIDDLEWARE ============
app.use(morgan('combined'));

// ============ ROUTES ============
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ============ CENTRALIZED ERROR HANDLER ============
app.use(errorMiddleware);

// ============ GRACEFUL STARTUP & SHUTDOWN ============
const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
  await connectDB();

  server = app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
  });
};

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✓ Shutting down gracefully...');
  server?.close(() => {
    console.log('✓ Server closed');
    mongoose.connection.close(false, () => {
      console.log('✓ MongoDB connection closed');
      process.exit(0);
    });
  });
});

// Start server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
