/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

const mongoose = require('mongoose');

export default async (req, res) => {
  dbConnect();
  const {
    query: { id },
    method,
  } = req;

  const { jobId } = req.body;
  const jobObjectId = mongoose.Types.ObjectId(jobId);
  const jobArray = [jobObjectId];

  if (method === 'PUT') {
    const user = await User.findById(id);

    if (!user.favoriteJobs) {
      try {
        await User.findOneAndUpdate(
          id,
          { favoriteJobs: jobArray },
          {
            new: true,
            runValidators: true,
          }
        );

        res
          .status(200)
          .json({ status: 200, success: true, message: 'First favorite Job!' });
      } catch (err) {
        res.status(400).json({ status: 400, success: false });
      }
    } else {
      try {
        await User.updateOne(
          { _id: id },
          { $addToSet: { favoriteJobs: jobObjectId } }
        );

        res.status(200).json({
          status: 200,
          success: true,
          message: 'Job added to favorites!',
        });
      } catch (err) {
        res.status(400).json({ status: 400, success: false });
      }
    }
  } else if (method === 'DELETE') {
    try {
      await User.updateOne(
        { _id: id },
        { $pull: { favoriteJobs: jobObjectId } }
      );

      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: 'Favorite job has been deleted!',
        });
    } catch (err) {
      res.status(400).json({ status: 400, success: true });
    }
  }
};
