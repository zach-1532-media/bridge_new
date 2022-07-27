import Stripe from 'stripe';

import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function webhookHandler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET);
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

    if (!sig || !webhookSecret) {
      return;
    }

    const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

    switch (event.type) {
      case 'payment_intent.succeeded':
        // Then define and call a function to handle the event
        break;
      // ... handle other event types
      default:
      // do something
    }

    res.status(200).send();
  }
}
