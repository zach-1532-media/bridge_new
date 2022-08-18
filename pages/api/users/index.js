/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable object-shorthand */
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { hashPassword } from '../../../lib/auth';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID);

export default async (req, res) => {
  await dbConnect();
  const { method } = req;
  const { firstName, lastName, email, password } = req.body;

  const newEmail = email.toLowerCase();

  if (method === 'POST') {
    const hashedPassword = await hashPassword(password);
    const randomNumber = Math.floor(Math.random() * (10000 - 1000) + 1000);

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      sessionName: `${firstName} ${lastName}`,
      email: newEmail,
      password: hashedPassword,
      verifyEmail: JSON.stringify(randomNumber),
    };

    const existingUser = await User.findOne({ email: newEmail });

    if (!existingUser) {
      try {
        const verify = {
          to: email,
          from: 'welcome@connectatthebridge.com',
          subject: 'Verify Email',
          html: `<h6>Below is the code to verify your email. 
            Please enter it on the page you were redirected to. If you no longer have access to that page, please 
            follow the below link.</h6><h1>${randomNumber}</h1> <a href="http://localhost:3000/verifyEmail/${email}">
            Link to verify email</a>`,
        };

        const user = await User.create(newUser);
        const id = user._id.toString();
        const data = {
          id,
          verifyEmail: user.verifyEmail,
        };
        await sgMail.send(verify);

        res.status(200).json({ case: 1, success: true, data });
      } catch (err) {
        res.status(400).json({
          case: 2,
          success: false,
        });
      }
    } else if (existingUser) {
      res
        .status(409)
        .json({ case: 3, success: false, message: 'User Already Exists' });
    }
  }
};
