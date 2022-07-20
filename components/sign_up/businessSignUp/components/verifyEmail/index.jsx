/* eslint-disable no-nested-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import Container from '../../../../front_components/container';
import Main from '../../../../../layouts/main';

import Backdrop from '../../../../shared/backdrop';

const VerifyEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifyCode, setverifyCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleChange = (e) => {
    setverifyCode(e.target.value);
  };

  const router = useRouter();
  // eslint-disable-next-line prefer-destructuring
  const id = router.query.id;

  const validate = () => {
    const err = {};

    if (!verifyCode) {
      err.verifyEmail = 'Please enter the code sent to you.';
    }

    return err;
  };

  // Send welcome email
  const sendWelcomeEmail = async () => {
    const welcomeData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`/api/welcomeEmail/${id}`, welcomeData);
    const data = await response.json();
    if (data.status === 200) {
      // Do nothing
    }
    setOpenBackdrop(false);
    setVerified(true);
    setIsSubmitting(false);
  };

  // Update emailVerified in db
  const updateEmailVerified = async () => {
    const updateVerified = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `/api/emailVerification/setVerified/business/${id}`,
      updateVerified
    );
    const data = await response.json();
    if (data.status === 200) {
      setIsVerified(true);
    }
  };

  // Send verification code
  const verify = async () => {
    const verifyEmail = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: verifyCode,
      }),
    };
    const response = await fetch(
      `/api/emailVerification/verifyCode/${id}`,
      verifyEmail
    );
    const data = await response.json();
    if (data.status === 200) {
      updateEmailVerified();
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        setOpenBackdrop(true);
        verify();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  useEffect(() => {
    if (isVerified) {
      sendWelcomeEmail();
    }
  }, [isVerified]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmitting(true);
  };

  return (
    <Main>
      <Container>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          xs={12}
        >
          {!verified ? (
            <Stack direction="column" spacing={2}>
              <Typography variant="h2">Verify your email</Typography>
              <Typography variant="body1" sx={{ color: 'gray' }}>
                We sent you an email with a 4 digit code. Please enter it below.
              </Typography>
              <TextField
                required
                id="verify-email"
                name="verifyEmail"
                label="Email Code"
                type="number"
                value={verifyCode}
                onChange={handleChange}
                error={errors.verifyEmail ? true : null}
                helperText={errors.verifyEmail ? errors.verifyEmail : null}
                inputProps={{
                  pattern: '[0-9]*',
                  inputMode: 'numeric',
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Verify
              </Button>
            </Stack>
          ) : (
            <Typography variant="h3">YOU DID IT</Typography>
          )}
        </Grid>
        <Backdrop openBackdrop={openBackdrop} />
      </Container>
    </Main>
  );
};

export default VerifyEmail;
