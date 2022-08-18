/* eslint-disable prefer-regex-literals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useEffect, useState } from 'react';

import { getSession, signIn } from 'next-auth/client';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';

import { GeneralSnack } from '../../shared/snackbars';

const Form = () => {
  const theme = useTheme();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    businessName: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const validate = () => {
    const err = {};
    const regEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    ).test(form.email);
    const regPassword = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    ).test(form.password);

    if (!form.email) {
      err.email = 'Please enter your email.';
    }

    if (!regEmail) {
      err.regEmail = 'Please enter a valid email address';
    }

    if (!form.password) {
      err.password = 'Please enter a password.';
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

  const signInUser = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (!res.error) {
      const mySession = await getSession();
      router.push(`/dashboards/${mySession.type}/${mySession.id}`);
    } else if (res.error) {
      setLoading(false);
      if (res.error === 'Password!') {
        setMessage('Incorrect password please try again');
      } else if (res.error === 'Username!') {
        setMessage('No User with this email');
      }
      setGeneralError(true);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        signInUser();
      }
    } else {
      setIsSubmitting(false);
    }
  }, [errors]);

  const submitSignIn = async (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmitting(true);
  };

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          gutterBottom
          sx={{
            textTransform: 'uppercase',
            fontWeight: 500,
            color: theme.palette.text.secondary,
            fontSize: '1.25em',
          }}
        >
          Login
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: '2.125rem',
            lineHeight: 1.235,
            letterSpacing: '0.00735em',
          }}
        >
          Welcome back
        </Typography>
        <Typography color="text.secondary">
          Login to manage your account.
        </Typography>
      </Box>
      <form onSubmit={submitSignIn}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              error={
                errors.email
                  ? true
                  : errors.regEmail
                  ? true
                  : message === 'No User with this email'
                  ? true
                  : null
              }
              helperText={
                errors.email
                  ? errors.email
                  : errors.regEmail
                  ? errors.regEmail
                  : message === 'No User with this email'
                  ? 'No User with this email'
                  : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                width: 1,
                mb: 2,
              }}
            >
              {/* <Typography variant="subtitle2">
                <NextLink href="/">
                  <Link
                    sx={{
                      color: theme.palette.primary.main,
                      '&:hover': { cursor: 'pointer' },
                    }}
                    underline="none"
                  >
                    Forgot your password?
                  </Link>
                </NextLink>
              </Typography> */}
            </Box>
            <FormControl fullWidth>
              <InputLabel htmlFor="outined-adornment-password">
                Password *
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="Password *"
                name="password"
                type={form.showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                error={
                  errors.password
                    ? true
                    : errors.regPassword
                    ? true
                    : message === 'Incorrect password please try again'
                    ? true
                    : null
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {form.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password || errors.regPassword ? (
                <FormHelperText error id="outlined-adornment-password-error">
                  {errors.password
                    ? errors.password
                    : errors.regPassword
                    ? errors.regPassword
                    : null}
                </FormHelperText>
              ) : message === 'Incorrect password please try again' ? (
                <FormHelperText sx={{ color: theme.palette.error.main }}>
                  Incorrect Password
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item container xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                width: 1,
                maxWidth: 600,
                m: '0 auto',
              }}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant="subtitle2">
                  Don't have an account yet?{' '}
                  <NextLink href="/signUp/user" passHref>
                    <Link
                      sx={{
                        color: theme.palette.primary.main,
                        '&:hover': { cursor: 'pointer' },
                      }}
                      underline="none"
                    >
                      Sign up here.
                    </Link>
                  </NextLink>
                </Typography>
              </Box>
              <LoadingButton
                loading={loading}
                size="large"
                variant="contained"
                type="submit"
              >
                Login
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </form>
      <GeneralSnack
        generalError={generalError}
        setGeneralError={setGeneralError}
        message={message}
      />
    </Box>
  );
};

export default Form;
