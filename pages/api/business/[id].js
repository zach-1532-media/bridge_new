/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../lib/dbConnect';
import Business from '../../../models/Business';

export default async (req, res) => {
  dbConnect();
  const {
    query: { id },
    method,
  } = req;

  if (method === 'PUT') {
    try {
      const business = await Business.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!business) {
        res.status(400).json({ status: 400, success: false });
      }
      res.status(200).json({ status: 200, success: true, data: business });
    } catch (err) {
      res.status(400).json({ status: 400, success: false });
    }
  } else if (method === 'DELETE') {
    try {
      const deletedBusiness = await Business.deleteOne({ _id: id });

      if (!deletedBusiness) {
        // Update snackbars when delete feature is added
        res.status(400).json({ status: 400, success: false });
      }

      res.status(200).json({ status: 200, success: true, data: {} });
    } catch (err) {
      res.status(400).json({ status: 400, success: false });
    }
  } else if (method === 'POST') {
    try {
      const business = await Business.findById(id);

      if (business.verifyEmail === req.body) {
        res.status(200).json({ case: 1, success: true });
      } else {
        res
          .status(400)
          .json({ case: 2, success: false, message: "Code's do not match" });
      }
    } catch (err) {
      res.status(400).json({ case: 3, success: false });
    }
  }
};
