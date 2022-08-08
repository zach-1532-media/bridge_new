/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

import Container from '../front_components/container';
import Orders from './components/orders';
import CheckoutForm from './components/checkoutForm';

const handleMail = () => {
  window.location.href =
    'mailto:nolan@connectatthebridge.com?subject=Questions about posting a job';
};

const handlePhone = () => {
  window.open('tel:6149378563');
};

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE);

const Checkout = ({ form }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch(`/api/create_payment_intent`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobType: `${form.job}`,
        id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
    variables: {
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      spacingUnit: '.3em',
      borderRadius: '.5em',
      colorPrimary: '#5271FF',
      colorDanger: '#FF1943',
      colorSuccess: '#57CA22',
      colorWarning: '#FFA319',
      spacingGridRow: '3em',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Container>
      <Box>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: '4em',
                  }}
                >
                  Payment Information
                </Typography>
                {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm
                      isSubmitting={isSubmitting}
                      setIsLoading={setIsLoading}
                      form={form}
                    />
                  </Elements>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" fontWeight={700} marginBottom={4}>
              Order summary
            </Typography>
            <Card
              variant="outlined"
              sx={{
                padding: { xs: 2, sm: 4 },
              }}
            >
              <Orders
                setIsSubmitting={setIsSubmitting}
                isLoading={isLoading}
                job={form.job}
              />
              <Box
                sx={{
                  marginRight: { xs: -2, sm: -4 },
                  marginLeft: { xs: -2, sm: -4 },
                  marginBottom: { xs: -2, sm: -4 },
                  padding: { xs: 2, sm: 4 },
                  bgcolor: 'alternate.main',
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        background: 'transparent',
                      },
                    }}
                    onClick={handlePhone}
                    startIcon={<LocalPhoneIcon />}
                  >
                    Contact sales
                  </Button>
                  <Button
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        background: 'transparent',
                      },
                    }}
                    onClick={handleMail}
                    startIcon={<EmailIcon />}
                  >
                    Email us
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Checkout;
