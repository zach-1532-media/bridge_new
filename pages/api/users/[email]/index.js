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
        res
          .status(409)
          .json({ code: 1, success: false, message: 'No User Exists!' });
      }

      res
        .status(200)
        .json({ code: 2, success: true, message: 'Success! Profile Updated.' });
    } catch (err) {
      res.status(400).json({ code: 3, success: false });
    }
  }
};

export default EmaileHandler;
