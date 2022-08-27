import dbConnect from '../../../../lib/dbConnect';
import Jobs from '../../../../models/Jobs';
import User from '../../../../models/User';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID);

const mongoose = require('mongoose');

const JobHandler = async (req, res) => {
  await dbConnect();
  const {
    query: { id },
    method,
  } = req;

  const { operation, data, userId } = req.body;

  if (method === 'PUT') {
    switch (operation) {
      case 'Delete':
        try {
          const objectIdArray = data.map((s) => mongoose.Types.ObjectId(s));
          await Jobs.findByIdAndUpdate(id, {
            $pull: { applicants: { $in: objectIdArray } },
            new: true,
            runValidators: true,
          });

          res.status(200).json({ case: 1, success: true });
        } catch (err) {
          res.status(400).json({ case: 2, success: false });
        }
        break;
      case 'Favorite Job':
        try {
          const jobObjectId = mongoose.Types.ObjectId(data);
          const jobArray = [jobObjectId];
          const user = await User.findById(userId);

          if (!user.favoriteJobs) {
            await User.findOneAndUpdate(
              id,
              { favoriteJobs: jobArray },
              {
                new: true,
                runValidators: true,
              },
            );
            res.status(200).json({
              status: 200,
              success: true,
              message: 'First favorite Job!',
            });
          } else {
            await User.findByIdAndUpdate(userId, {
              $addToSet: { favoriteJobs: jobObjectId },
            });
            res.status(200).json({
              status: 200,
              success: true,
              message: 'Job added to favorites!',
            });
          }
        } catch (err) {
          res.status(400).json({ status: 400, success: false });
        }
        break;
      default:
        res.status(400).json({ status: 400, success: false });
        break;
    }
  } else if (method === 'POST') {
    try {
      await Jobs.create({
        businessID: id,
        dateCreated: new Date(),
        ...req.body,
      });
      res.status(200).json({ case: 1, success: true, message: 'Job Posted!' });
    } catch (err) {
      res.status(400).json({
        case: 2,
        success: false,
        message:
          'Something went wrong posting this job. Please try again later',
      });
    }
  }
};

export default JobHandler;
