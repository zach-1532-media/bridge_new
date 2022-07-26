import dbConnect from '../../lib/dbConnect';
import Job from '../../models/Job';

export default async (req, res) => {
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
        businessID: businessID,
        job: job,
        city: city,
        state: state,
        benefits: benefits,
        salary: salary,
        workType: workType,
        description: description,
        jobTitle: jobTitle,
        travel: travel,
        hourlyRate: hourlyRate,
        responsibilities: responsibilities,
        qualifications: qualifications,
        dateCreated: new Date(),
      });

      res.status(200).json({ status: 200, message: 'Job Created' });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: 'no worky' });
  }
};
