import dbConnect from '../../lib/dbConnect';
import Job from '../../models/Job';

export default async (req, res) => {
  dbConnect();
  const { method } = req;
  const { jobID, paymentID } = req.body;

  if (method === 'PUT') {
    try {
      const job = await Job.findByIdAndUpdate(
        jobID,
        { initialPaymentIntentId: paymentID },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!job) {
        res.status(400).json({ status: 400, message: 'Job does not exist' });
      }

      res.status(200).json({ status: 200, message: 'Success!' });
    } catch (err) {
      res.status(400).json({ status: 400, success: false });
    }
  }
};
