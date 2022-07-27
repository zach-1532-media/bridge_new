// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const CreatePaymentIntentHandler = async (req, res) => {
  const { jobType, id } = req.body;

  const fullTimePrice = 300;
  const partTimePrice = 300;
  const tax = 0.075;
  const fullTimeTotal = fullTimePrice * tax + fullTimePrice;
  const partTimeTotal = partTimePrice * tax + partTimePrice;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: jobType === 'Full-Time' ? fullTimeTotal * 100 : partTimeTotal * 100,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      businessId: id,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

export default CreatePaymentIntentHandler;
