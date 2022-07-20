/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-expressions */
/* eslint-disable object-shorthand */
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async (req, res) => {
  dbConnect();
  const { method } = req;
  const { email } = req.body;

  if (method === 'PUT') {
    try {
      await User.updateOne(
        { email: email },
        { newsletter: true },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({ status: 200, success: true });
    } catch (err) {
      res.status(400).json({ status: 400, success: false });
    }
  }
};
