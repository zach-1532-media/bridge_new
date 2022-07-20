/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable object-shorthand */
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import Newsletter from '../../../models/Newsletter';

export default async (req, res) => {
  await dbConnect();
  const { method } = req;
  const { firstName, lastName, email } = req.body;

  const newEmail = email.toLowerCase();

  if (method === 'POST') {
    const newNewsletter = {
      firstName: firstName,
      lastName: lastName,
      email: newEmail,
      newsletter: true,
    };

    const existingNewsletter = await Newsletter.findOne({ email: newEmail });
    const existingUser = await User.findOne({ email: newEmail });

    try {
      if (existingUser) {
        if (existingUser.newsletter) {
          res.status(409).json({ status: 'User with newsletter' });
        } else if (!existingUser.newsletter) {
          res.status(200).json({ status: 'User without newsletter' });
        }
      }
      if (existingNewsletter && !existingUser) {
        res.status(409).json({ status: 'existing newsletter' });
      } else if (!existingNewsletter && !existingUser) {
        await Newsletter.create(newNewsletter);
        res.status(200).json({ status: 'success' });
      }
    } catch (err) {
      res.status(400).json({ status: 'error' });
    }
  }
};
