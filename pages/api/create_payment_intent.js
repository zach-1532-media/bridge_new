// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async function handler(req, res) {
  const {
    jobType,
    id,
    job,
    city,
    state,
    salary,
    benefits,
    workType,
    description,
    hourlyRate,
    travel,
    jobTitle,
    responsibilities,
    qualifications,
  } = req.body;

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
      job: job,
      city: city,
      state: state,
      salary: salary,
      benefits: benefits,
      workType: workType,
      description: description,
      hourlyRate: hourlyRate,
      travel: travel,
      jobTitle: jobTitle,
      responsibilities: responsibilities,
      qualifications,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
