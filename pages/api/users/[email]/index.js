/* eslint-disable object-shorthand */
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

const EmaileHandler = async (req, res) => {
  dbConnect();
  const {
    query: { email },
    method,
  } = req;

  if (method === 'PUT') {
    try {
      const user = await User.updateOne({ email: email }, req.body, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        res.status(409).json({ status: 409, success: false });
      }

      res.status(200).json({ status: 200, success: true });
    } catch (err) {
      res.status(400).json({ status: 400, success: false });
    }
  }
};

export default EmaileHandler;
