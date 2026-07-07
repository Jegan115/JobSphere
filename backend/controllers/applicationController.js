import Application from '../models/Application.js';
import Job from '../models/Job.js';
import AppError from '../utils/errorHandler.js';

// Apply to job
export const applyToJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { resume, coverLetter } = req.body;

    // Validation
    if (!resume) {
      return next(new AppError('Resume URL is required', 400));
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return next(new AppError('Job not found', 404));
    }

    // Check if application already exists
    const existingApplication = await Application.findOne({
      jobId,
      applicantId: req.user.userId
    });

    if (existingApplication) {
      return next(new AppError('You have already applied to this job', 409));
    }

    // Create application
    const application = await Application.create({
      jobId,
      applicantId: req.user.userId,
      resume,
      coverLetter
    });

    // Increment applications count
    await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    next(error);
  }
};

// Get applications for a job (employer only)
export const getJobApplications = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // Verify job belongs to employer
    const job = await Job.findById(jobId);
    if (!job) {
      return next(new AppError('Job not found', 404));
    }

    if (job.companyId.toString() !== req.user.userId) {
      return next(new AppError('Unauthorized to view applications for this job', 403));
    }

    const applications = await Application.find({ jobId })
      .populate('applicantId', 'fullName email phone profilePicture skills')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      applications,
      total: applications.length
    });
  } catch (error) {
    next(error);
  }
};

// Get applications by user (job seeker)
export const getUserApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicantId: req.user.userId })
      .populate('jobId', 'title location companyId salaryMin salaryMax')
      .populate({
        path: 'jobId',
        populate: {
          path: 'companyId',
          select: 'fullName companyName profilePicture'
        }
      })
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      applications,
      total: applications.length
    });
  } catch (error) {
    next(error);
  }
};

// Update application status (employer only)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!status || !['applied', 'shortlisted', 'rejected', 'accepted'].includes(status)) {
      return next(new AppError('Valid status is required', 400));
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return next(new AppError('Application not found', 404));
    }

    // Verify job belongs to employer
    const job = await Job.findById(application.jobId);
    if (job.companyId.toString() !== req.user.userId) {
      return next(new AppError('Unauthorized to update this application', 403));
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      application: updatedApplication
    });
  } catch (error) {
    next(error);
  }
};

// Withdraw application
export const withdrawApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);
    if (!application) {
      return next(new AppError('Application not found', 404));
    }

    // Check authorization
    if (application.applicantId.toString() !== req.user.userId) {
      return next(new AppError('Unauthorized to withdraw this application', 403));
    }

    await Application.findByIdAndDelete(applicationId);

    // Decrement applications count
    await Job.findByIdAndUpdate(application.jobId, { $inc: { applicationsCount: -1 } });

    res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully'
    });
  } catch (error) {
    next(error);
  }
};
