import dbConnect from '../../../../../lib/dbConnect';
import Business from '../../../../../models/Business';

const CloudinaryToMongo = async (req, res) => {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  if (method === 'PUT') {
    try {
      await Business.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({ status: 200, message: 'uploaded' });
    } catch (err) {
      res.status(400).json({ status: 400, message: 'error uploading' });
    }
  }
};

export default CloudinaryToMongo;