import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

const verify = async (req, res) => {
  await dbConnect();

  const {
    query: { email },
    method,
  } = req;
  const { code } = req.body;

  if (method === 'POST') {
    // eslint-disable-next-line object-shorthand
    const user = await User.findOne({ email: email });

    if (!user) {
      res
        .status(409)
        .json({ status: 409, success: false, message: 'No Username exists' });
    } else if (code === user.verifyEmail) {
      res
        .status(200)
        .json({ status: 200, success: true, message: 'yay it worked' });
    } else {
      res
        .status(409)
        .json({ status: 409, success: true, message: 'Nope did not work' });
    }
  }
};

export default verify;
