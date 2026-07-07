import User from '../models/User.js';
import AppError from '../utils/errorHandler.js';
import { isValidEmail, isValidPassword } from '../utils/validators.js';

// Register user
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword, role, companyName } = req.body;

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      return next(new AppError('All fields are required', 400));
    }

    if (!isValidEmail(email)) {
      return next(new AppError('Invalid email format', 400));
    }

    if (!isValidPassword(password)) {
      return next(
        new AppError(
          'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
          400
        )
      );
    }

    if (password !== confirmPassword) {
      return next(new AppError('Passwords do not match', 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already registered', 409));
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      role: role || 'jobSeeker',
      ...(companyName ? { companyName } : {})
    });

    // Generate token
    const token = user.generateToken();

    // Set secure httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: process.env.COOKIE_SAME_SITE || 'lax',
      maxAge: parseInt(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
    });

    // Remove password from response
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return next(new AppError('Email and password are required', 400));
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Generate token
    const token = user.generateToken();

    // Set secure httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: process.env.COOKIE_SAME_SITE || 'lax',
      maxAge: parseInt(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
    });

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user
    });
  } catch (error) {
    next(error);
  }
};

// Logout user
export const logout = (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: process.env.COOKIE_SAME_SITE || 'lax'
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};
