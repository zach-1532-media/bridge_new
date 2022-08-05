/* eslint-disable object-shorthand */
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

const NewsletterHandler = async (req, res) => {
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
        },
      );
      res.status(200).json({
        case: 1,
        success: true,
        message: "Success! You're all signed up!",
      });
    } catch (err) {
      res.status(400).json({ case: 2, success: false });
    }
  }
};

export default NewsletterHandler;
