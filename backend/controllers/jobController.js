import Job from '../models/Job.js';
import AppError from '../utils/errorHandler.js';

// Create job (employer only)
export const createJob = async (req, res, next) => {
  try {
    const { title, description, location, category, jobType, experience, salaryMin, salaryMax, requiredSkills, deadline } = req.body;

    // Validation
    if (!title || !description || !location || !category || !jobType || !experience || salaryMin === undefined || salaryMax === undefined || !deadline) {
      return next(new AppError('All required fields must be provided', 400));
    }

    if (salaryMax < salaryMin) {
      return next(new AppError('Maximum salary must be greater than minimum salary', 400));
    }

    // Create job
    const job = await Job.create({
      title,
      description,
      companyId: req.user.userId,
      location,
      category,
      jobType,
      experience,
      salaryMin,
      salaryMax,
      requiredSkills: requiredSkills || [],
      deadline
    });

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      job
    });
  } catch (error) {
    next(error);
  }
};

// Get all jobs with filters
export const getAllJobs = async (req, res, next) => {
  try {
    const { category, location, jobType, experience, search } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (jobType) filter.jobType = jobType;
    if (experience) filter.experience = experience;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .populate('companyId', 'fullName companyName website profilePicture')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      jobs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single job
export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate('companyId', 'fullName companyName website profilePicture');

    if (!job) {
      return next(new AppError('Job not found', 404));
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    next(error);
  }
};

// Update job (employer only)
export const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return next(new AppError('Job not found', 404));
    }

    // Check authorization
    if (job.companyId.toString() !== req.user.userId) {
      return next(new AppError('Unauthorized to update this job', 403));
    }

    // Update allowed fields
    const allowedUpdates = ['title', 'description', 'location', 'category', 'jobType', 'experience', 'salaryMin', 'salaryMax', 'requiredSkills', 'deadline', 'isActive'];
    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedJob = await Job.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job: updatedJob
    });
  } catch (error) {
    next(error);
  }
};

// Delete job (employer only)
export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return next(new AppError('Job not found', 404));
    }

    // Check authorization
    if (job.companyId.toString() !== req.user.userId) {
      return next(new AppError('Unauthorized to delete this job', 403));
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get jobs by employer
export const getEmployerJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ companyId: req.user.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    next(error);
  }
};
