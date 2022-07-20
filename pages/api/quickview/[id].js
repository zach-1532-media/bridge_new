/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../lib/dbConnect';
import Business from '../../../models/Business';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const business = await Business.findById(id);

        if (!business) {
          res.status(400).json({ success: false });
        }

        res.status(200).json(business);
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
