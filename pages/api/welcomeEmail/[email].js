/* eslint-disable object-shorthand */
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID);

export default async function welcomeEmail(req, res) {
  await dbConnect();
  const {
    query: { email },
    method,
  } = req;

  if (method === 'POST') {
    const user = await User.findOne({ email: email });

    const verified = user.verifyEmail;

    if (verified) {
      try {
        const welcome = {
          to: email,
          from: 'welcome@connectatthebridge.com',
          subject: 'Welcome to The Bridge!',
          html: '<h1>YOU DID IT</h1>',
        };

        await sgMail.send(welcome);

        res.status(200).json({ status: 200, success: true });
      } catch (err) {
        res.status(400).json({ status: 400, success: false });
      }
    } else {
      res.status(400).json({ status: 400, success: false });
    }
  }
}
