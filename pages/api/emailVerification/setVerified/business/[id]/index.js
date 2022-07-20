/* eslint-disable object-shorthand */
import dbConnect from '../../../../../../lib/dbConnect';
import Business from '../../../../../../models/Business';

const setVerified = async (req, res) => {
  await dbConnect();
  const {
    query: { id },
    method,
  } = req;

  if (method === 'PUT') {
    const business = await Business.findById(id);

    if (business) {
      const updateBusiness = await Business.findByIdAndUpdate(
        id,
        { emailVerified: true },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: 200,
        success: true,
        data: updateBusiness,
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
