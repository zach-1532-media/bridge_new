import dbConnect from '../../lib/dbConnect';
import Job from '../../models/Job';

const PostAJob = async (req, res) => {
  dbConnect();

  const { method } = req;
  const {
    job,
    city,
    state,
    salary,
    benefits,
    workType,
    description,
    jobTitle,
    hourlyRate,
    travel,
    responsibilities,
    qualifications,
    businessID,
  } = req.body;

  try {
    if (method === 'POST') {
      await Job.create({
        businessID,
        job,
        city,
        state,
        benefits,
        salary,
        workType,
        description,
        jobTitle,
        travel,
        hourlyRate,
        responsibilities,
        qualifications,
        dateCreated: new Date(),
      });

      res.status(200).json({ status: 200, message: 'Job Created' });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: 'no worky' });
  }
};

export default PostAJob;
