/* eslint-disable import/no-extraneous-dependencies */
import User from '../../../../models/User';
import Newsletter from '../../../../models/Newsletter';
import dbConnect from '../../../../lib/dbConnect';

const client = require('@sendgrid/client');

client.setApiKey(process.env.SENDGRID);

const UserEmailHandler = async (req, res) => {
  const { method } = req;

  const { operation, email, id, newsletter } = req.body;

  if (method === 'PUT') {
    switch (operation) {
      case 'add contact':
        try {
          const data = {
            list_ids: ['fccf0dd1-4c91-42a3-a067-abd008c35ce5'],
            contacts: [
              {
                email,
              },
            ],
          };

          const request = {
            url: `/v3/marketing/contacts`,
            method: 'PUT',
            body: data,
          };

          client.request(request).then(([response]) => {
            if (response.statusCode === 202) {
              res
                .status(200)
                .json({ case: 1, success: true, message: 'Signed up!' });
            }
          });
        } catch (err) {
          res.status(400).json({ case: 2, success: false });
        }
        break;
      case 'subscribe-unsubscribe':
        try {
          await dbConnect();

          await User.findByIdAndUpdate(
            id,
            { newsletter },
            { new: true, runValidators: true },
          );

          res.status(200).json({
            case: 1,
            success: true,
            message: newsletter ? 'Subscribed!' : 'Unsubscribed',
          });
        } catch (err) {
          res.status(400).json({ case: 2, success: false });
        }
        break;
      default:
        break;
    }
  } else if (method === 'POST') {
    switch (operation) {
      case 'mongo':
        try {
          await dbConnect();

          const user = await User.findOne({ email });
          const existingNewsletter = await Newsletter.findOne({ email });

          if (!user && !existingNewsletter) {
            await Newsletter.create({
              email,
              newsletter: true,
              dateSubscribed: new Date(),
            });
          }

          if (user && !user.newsletter) {
            await User.findOneAndUpdate(
              { email },
              { newsletter: true },
              { new: true, runValidators: true },
            );
          }
          res
            .status(200)
            .json({ case: 1, success: true, message: "You're signed up!" });
        } catch (err) {
          res.status(400).json({ case: 2, success: false });
        }
        break;
      default:
        break;
    }
  }
};

export default UserEmailHandler;
