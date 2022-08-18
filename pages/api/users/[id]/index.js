import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

const UserHandler = async (req, res) => {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  if (method === 'POST') {
    try {
      const user = await User.findById(id);

      if (user.verifyEmail === req.body) {
        res.status(200).json({ case: 1, success: true });
      } else {
        res
          .status(400)
          .json({ case: 2, success: false, message: "Code's do not match" });
      }
    } catch (err) {
      res.status(400).json({ case: 3, success: false });
    }
  } else if (method === 'PUT') {
    try {
      const user = await User.findByIdAndUpdate(id, req.body, {
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

export default UserHandler;
