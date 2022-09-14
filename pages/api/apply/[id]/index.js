/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable object-shorthand */
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import Jobs from '../../../../models/Jobs';

const mongoose = require('mongoose');

export default async (req, res) => {
  dbConnect();
  const {
    query: { id },
    method,
  } = req;

  const userObjectId = mongoose.Types.ObjectId(id);
  const userArray = [userObjectId];
  const { jobId } = req.body;
  const jobObjectId = mongoose.Types.ObjectId(jobId);
  const jobArray = [jobObjectId];

  if (method === 'PUT') {
    const user = await User.findById(id);
    const job = await Jobs.findById(jobId);

    if (!user.appliedJobs) {
      try {
        await User.findOneAndUpdate(
          id,
          { appliedJobs: jobArray },
          {
            new: true,
            runValidators: true,
          },
        );

        res.status(200).json({ status: 200, success: true });
      } catch (err) {
        res.status(400).json({
          status: 400,
          success: false,
        });
      }
    } else {
      try {
        await User.updateOne(
          { _id: id },
          { $addToSet: { appliedJobs: jobObjectId } },
        );

        res.status(200).json({ status: 200, success: true });
      } catch (err) {
        res.status(400).json({ status: 400, success: false });
      }
    }

    if (!job.applicants) {
      try {
        await Jobs.findOneAndUpdate(
          jobId,
          { applicants: userArray },
          { new: true, runValidators: true },
        );

        res.status(200).json({ status: 201, success: true });
      } catch (err) {
        res.status(400).json({ status: 401, success: true });
      }
    } else {
      try {
        await Jobs.updateOne(
          { _id: jobId },
          { $addToSet: { applicants: userObjectId } },
        );
      } catch (err) {
        res.status(400).json({ status: 401, success: true });
      }
    }
  }
};
