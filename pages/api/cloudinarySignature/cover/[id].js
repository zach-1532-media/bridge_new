require('../../../../lib/cloudinaryConfig');

const cloudinary = require('cloudinary').v2;

const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;
const apiSecret = cloudinary.config().api_secret;

const getSignature = async (req, res) => {
  const {
    query: { id },
  } = req;
  const signuploadform = () => {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        public_id: `${id}`,
        upload_preset: 'cover',
      },
      apiSecret,
    );

    return { timestamp, signature };
  };

  const sig = signuploadform();

  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: cloudName,
    apikey: apiKey,
  });
};

export default getSignature;
