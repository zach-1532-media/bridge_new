import { React, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export default function CheckoutForm({ isSubmitting, setIsLoading }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { id } = router.query;

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/dashboards/business/confirmation/${id}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isSubmitting) {
      handleSubmit();
    }
  });

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Box sx={{ mb: '4em' }}>
        <PaymentElement id="payment-element" />
      </Box>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

CheckoutForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};
