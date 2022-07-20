/* eslint-disable object-shorthand */
import dbConnect from '../../../../../../lib/dbConnect';
import User from '../../../../../../models/User';

const setVerified = async (req, res) => {
  await dbConnect();
  const {
    query: { email },
    method,
  } = req;

  if (method === 'PUT') {
    const user = await User.findOne({ email: email });

    if (user) {
      const updateUser = await User.findByIdAndUpdate(
        user.id,
        { emailVerified: true },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: 200,
        success: true,
        data: updateUser,
        message: 'Email Verified',
      });
    } else {
      res
        .status(400)
        .json({ status: 400, successs: false, message: 'Could not update' });
    }
  }
};

export default setVerified;
