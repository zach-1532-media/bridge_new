/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-nested-ternary */
import { React, useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import { SuccessSnack, GeneralSnack } from '../../../shared/snackbars';

const Newsletter = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [message, setMessage] = useState('');

  const addToNewsletterContact = async () => {
    const newsletter = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ operation: 'add contact', email }),
    };
    const res = await fetch('/api/emails/users', newsletter);
    const response = await res.json();
    if (response.case === 1) {
      const newsletterMongo = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation: 'mongo', email }),
      };
      const mongoRes = await fetch('/api/emails/users', newsletterMongo);
      const mongoResponse = await mongoRes.json();
      if (mongoResponse.case === 1) {
        setIsSubmitting(false);
        setIsLoading(false);
        setMessage(mongoResponse.message);
        setOpenSuccess(true);
      } else {
        setIsSubmitting(false);
        setIsLoading(false);
        setGeneralError(false);
      }
    } else if (response.case === 2) {
      setIsSubmitting(false);
      setIsLoading(false);
      setGeneralError(true);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        setIsLoading(true);
        addToNewsletterContact();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const validate = () => {
    const err = {};
    const regEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    ).test(email);

    if (!email) {
      err.email = 'Please enter your email';
    }

    if (!regEmail) {
      err.regEmail = 'Please enter a valid email address';
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmitting(true);
  };

  return (
    <Box>
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: '2.125rem',
            lineHeight: 1.235,
            letterSpacing: '0.00735em',
          }}
        >
          Get our stories delievered
        </Typography>
        <Typography
          align="center"
          component="p"
          sx={{
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.6,
            letterSpacing: '0.0075em',
            color: theme.palette.text.secondary,
          }}
        >
          From us to your inbox weekly.
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: 600,
          m: '0 auto',
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            '& .MuiInputBase-input.MuiOutlinedInput-imput': {
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent={{ xs: 'center' }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="Enter your email"
              sx={{ maxWidth: 422, height: 54 }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={errors.email ? true : errors.regEmail ? true : null}
              helperText={
                errors.email
                  ? errors.email
                  : errors.regEmail
                  ? errors.regEmail
                  : null
              }
            />
            <LoadingButton
              onClick={handleSubmit}
              loading={isLoading}
              variant="contained"
              sx={{ height: 54 }}
            >
              Subscribe
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
      <SuccessSnack
        setOpenSuccess={setOpenSuccess}
        openSuccess={openSuccess}
        message={message}
      />
      <GeneralSnack
        setGeneralError={setGeneralError}
        generalError={generalError}
        message={message}
      />
    </Box>
  );
};

export default Newsletter;
