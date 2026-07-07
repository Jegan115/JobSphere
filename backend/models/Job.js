import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      minlength: [20, 'Description must be at least 20 characters']
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Company ID is required'],
      validate: {
        async: true,
        validator: async function (v) {
          const user = await mongoose.model('User').findById(v);
          return user && user.role === 'employer';
        },
        message: 'Company must be an employer user'
      }
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    category: {
      type: String,
      enum: ['IT', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Other'],
      required: [true, 'Category is required']
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
      required: [true, 'Job type is required']
    },
    experience: {
      type: String,
      enum: ['Entry Level', 'Mid Level', 'Senior'],
      required: [true, 'Experience level is required']
    },
    salaryMin: {
      type: Number,
      required: [true, 'Minimum salary is required'],
      min: [0, 'Salary cannot be negative']
    },
    salaryMax: {
      type: Number,
      required: [true, 'Maximum salary is required'],
      min: [0, 'Salary cannot be negative'],
      validate: {
        validator: function (value) {
          return value >= this.salaryMin;
        },
        message: 'Maximum salary must be greater than minimum salary'
      }
    },
    requiredSkills: [
      {
        type: String,
        trim: true
      }
    ],
    deadline: {
      type: Date,
      required: [true, 'Application deadline is required'],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: 'Deadline must be in the future'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    applicationsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
jobSchema.index({ companyId: 1, isActive: 1 });
jobSchema.index({ category: 1, location: 1 });
jobSchema.index({ deadline: 1 });

const Job = mongoose.model('Job', jobSchema);
export default Job;
