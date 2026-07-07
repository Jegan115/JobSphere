import jwt from 'jsonwebtoken';
import AppError from '../utils/errorHandler.js';

export const verifyAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(new AppError('Unauthorized. Token not found.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired', 401));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token', 401));
    }
    next(new AppError('Authentication failed', 401));
  }
};

// Restrict a route to specific roles, e.g. restrictTo('employer', 'admin')
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

export default verifyAuth;
