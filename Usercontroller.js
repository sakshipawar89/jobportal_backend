const Application = require('./UserModal'); // adjust path if needed

// @desc    Submit a new job application
// @route   POST /api/applications
// @access  Public
const submitApplication = async (req, res) => {
  try {
    const {
      applicantType,
      currentPackage,
      expectedPackage,
      coverLetter,
      jobId, // Optional if linking to a job post
      applicantName,
    } = req.body;

    if (!applicantType || !coverLetter || !applicantName) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const applicationData = {
      applicantType,
      applicantName,
      jobId,
      currentPackage: parseFloat(currentPackage) || 0,
      expectedPackage: parseFloat(expectedPackage) || 0,
      coverLetter,
      appliedDate: new Date(),
      status: 'pending',
    };

    // If CV file uploaded
    if (req.file) {
      applicationData.cv = {
        filename: req.file.filename,
        path: req.file.path,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    const newApplication = new Application(applicationData);
    await newApplication.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      data: newApplication,
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Submission failed', error: error.message });
  }
};

// @desc    Get all job applications
// @route   GET /api/applications
// @access  Admin or Employer
const getApplications = async (req, res) => {
  try {
    const filters = {};

    // Optional query filter: ?jobId=xyz
    if (req.query.jobId) {
      filters.jobId = req.query.jobId;
    }

    const applications = await Application.find(filters)
      .sort({ createdAt: -1 })
      .populate({
        path: 'jobId',
        select: 'title company'
      });

    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
};

// @desc    Update application status (select/reject)
// @route   PUT /api/applications/:id/status
// @access  Admin or Employer
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'selected', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updated = await Application.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Application not found' });

    res.status(200).json({ message: 'Status updated', data: updated });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  updateApplicationStatus,
};
