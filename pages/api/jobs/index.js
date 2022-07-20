/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable object-shorthand */
import dbConnect from '../../../lib/dbConnect';
import Job from '../../../models/Job';

export default async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === 'POST') {
    try {
      await Job.create(req.body);

      res.status(200).json({ status: 200, success: true });
    } catch (err) {
      res.status(400).json({ status: 400, success: false });
    }
  }
};
