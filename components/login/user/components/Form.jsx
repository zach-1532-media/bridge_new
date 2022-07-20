/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
import { React, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { signIn, signOut } from 'next-auth/client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Backdrop from '../../../shared/backdrop';
import { GeneralSnack, NoUserSnack } from '../../../shared/snackbars';

const Form = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [openNoUser, setOpenNoUser] = useState(false);
  const [errors, setErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  async function handleSubmit() {
    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setOpenBackdrop(false);

    if (!result.error) {
      router.replace(`/dashboard/users/${form.email}`);
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        setOpenBackdrop(true);
        handleSubmit();
      } else {
        setIsSubmitting(false);
      }
    }
  }, []);

  const validate = () => {
    const err = {};
    const regEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    ).test(form.email);
    const regPassword = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ).test(form.password);

    if (!form.email) {
      err.email = 'Please enter your email.';
    }

    if (!form.password) {
      err.password = 'Please enter your password.';
    }

    if (!regEmail) {
      err.regEmail = 'Please enter a valid email address.';
    }

    if (!regPassword) {
      err.regPassword = (
        <span>
          All passwords must have at least:
          <ul>
            <li>8 characters</li>
            <li>1 uppercase letter</li>
            <li>1 lowercase letter</li>
            <li>1 number</li>
            <li>1 special character</li>
          </ul>
        </span>
      );
    }

    return err;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmitting(true);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          gutterBottom
          sx={{
            color: 'text.secondary',
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
        >
          Login
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Welcome Back
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Enter you email
          </Typography>
          <TextField
            required
            variant="standard"
            name="email"
            fullWidth
            value={form.email ?? ''}
            onChange={handleChange}
            error={errors.email ? true : errors.regEmail ? true : null}
            helperText={
              errors.email
                ? errors.email
                : errors.regEmail
                ? errors.regEmail
                : null
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'streched', sm: 'center' }}
            justifyContent="space-between"
            sx={{
              width: 1,
              mb: 2,
            }}
          >
            <Box marginBottom={{ xs: 1, sm: 0 }}>
              <Typography variant="subtitle2">Enter your password</Typography>
            </Box>
          </Box>
          <TextField
            variant="standard"
            name="password"
            fullWidth
            value={form.password ?? ''}
            onChange={handleChange}
            error={errors.password ? true : errors.regPassword ? true : null}
            helperText={
              errors.password
                ? errors.password
                : errors.regPassword
                ? errors.regPassword
                : null
            }
          />
        </Grid>
        <Grid item container xs={12}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ sx: 'stretched', sm: 'center' }}
            justifyContent="space-between"
            sx={{
              width: 1,
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            <Box marginBottom={{ xs: 1, sm: 0 }}>
              <Typography variant="subtitle2">
                Don&apos;t have an account yet?{' '}
                <Link href="/userSignUp" passHref>
                  <Button
                    variant="text"
                    disableRipple
                    sx={{
                      '&:hover': {
                        background: 'transparent',
                      },
                    }}
                  >
                    Sign up here
                  </Button>
                </Link>
              </Typography>
            </Box>
            <Button size="large" variant="contained" onClick={formSubmit}>
              Login
            </Button>
            <Button onClick={() => signOut()}>Logout</Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            <Link href="/" passHref>
              <Button
                variant="text"
                disableRipple
                sx={{
                  '&:hover': {
                    background: 'transparent',
                  },
                }}
              >
                Forgot your password?
              </Button>
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Backdrop openBackdrop={openBackdrop} />
      <GeneralSnack
        generalError={generalError}
        setGeneralError={setGeneralError}
      />
      <NoUserSnack openNoUser={openNoUser} setOpenNoUser={setOpenNoUser} />
    </Box>
  );
};

export default Form;
