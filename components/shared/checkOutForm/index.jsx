import React from 'react';

import Image from 'next/image';

import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Container from '../../front_components/container';

export default function CheckoutForm() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <Box
      position="relative"
      minHeight="calc(100vh - 247px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={1}
    >
      <Container>
        <Grid container>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            xs={12}
            md={6}
          >
            {/* Form */}
            <Stack direction="column" spacing={2} sx={{ mb: '5em' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: '2em',
                }}
              >
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ color: theme.palette.text.primary, fontWeight: 700 }}
                >
                  Enter your payment information below
                </Typography>
              </Box>
              <form id="payment-form" onSubmit={handleSubmit}>
                <Box sx={{ mb: '2em' }}>
                  <PaymentElement id="payment-element" />
                </Box>
                <Button
                  variant="outlined"
                  type="submit"
                  disabled={isLoading || !stripe || !elements}
                  id="submit"
                >
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    'Pay now'
                  )}
                </Button>
                {message && <div id="payment-message">{message}</div>}
              </form>

              <Typography
                variant="body2"
                sx={{ color: 'gray', pl: '1em', pr: '1em' }}
              >
                By clicking the Pay Now button, I agree to the&nbsp;
                <Button
                  disableRipple
                  variant="text"
                  sx={{
                    '&:hover': {
                      background: 'transparent',
                    },
                    mb: '.2em',
                    ml: '-1em',
                  }}
                >
                  terms of service.
                </Button>
              </Typography>
              {/* Terms Modal */}
            </Stack>
          </Grid>

          {/* Picture */}
          {isMd ? (
            <Grid item container justifyContent="center" xs={12} md={6}>
              <Box height={1} width={1} maxWidth={500} sx={{ mb: '5em' }}>
                <Box width={1} height={1}>
                  <Image
                    alt="content creator"
                    src="https://connectatthebridge.nyc3.cdn.digitaloceanspaces.com/site-assets/pay_illustration.svg"
                    height={900}
                    width={600}
                  />
                </Box>
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </Box>
  );
}
