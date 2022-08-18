/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';

import VerifyEmail from '../../shared/verifyEmail';
import { modalStyle } from '../../shared/data';
import { GeneralSnack } from '../../shared/snackbars';

const SignUpForm = ({ businessName }) => {
  const theme = useTheme();
  const router = useRouter();
  const user = router.pathname === '/signUp/user';
  const userType = router.pathname === '/signUp/user' ? 'users' : 'business';

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
  const [generalError, setGeneralError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => setModalOpen(false);

  const validate = () => {
    const err = {};
    const regEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    ).test(form.email);
    const regPassword = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    ).test(form.password);

    if (!form.firstName) {
      err.firstName = 'Please enter your first name.';
    }

    if (!form.lastName) {
      err.lastName = 'Please enter your first name.';
    }

    if (businessName) {
      if (!form.businessName) {
        err.businessName = 'Please enter your Business Name.';
      }
    }

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

  const createUser = async () => {
    const newUser = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    };
    const res = await fetch(`/api/${userType}`, newUser);
    const response = await res.json();
    setIsSubmitting(false);
    setIsLoading(false);
    if (response.case === 1) {
      window.localStorage.setItem(
        'data',
        JSON.stringify({
          email: form.email,
          password: form.password,
          verifyEmail: response.data.verifyEmail,
          type: router.pathname === '/signUp/business' ? 'business' : 'users',
        }),
      );
      router.push(`/verifyEmail/${response.data.id}`);
    } else if (response.case === 2) {
      setGeneralError(true);
    } else if (response.case === 3) {
      setGeneralError(true);
      setMessage(response.message);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createUser();
      } else {
        setIsSubmitting(false);
        setIsLoading(false);
      }
    }
  });

  const formSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmitting(true);
    setIsLoading(true);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          gutterbottom="true"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 500,
            color: theme.palette.text.secondary,
            fontSize: '1.25em',
          }}
        >
          Signup
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '2.125rem',
            lineHeight: 1.235,
            letterSpacing: '0.00735em',
          }}
        >
          Create an account
        </Typography>
        <Typography
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          Fill out the form to get started
        </Typography>
      </Box>
      <form onSubmit={formSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="first-name"
              name="firstName"
              label="First Name"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName ? true : null}
              helperText={errors.firstName ? errors.firstName : null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="last-name"
              name="lastName"
              label="Last Name"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName ? true : null}
              helperText={errors.lastName ? errors.lastName : null}
            />
          </Grid>
          {businessName ? (
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="businessName"
                name="businessName"
                label="Business Name"
                value={form.businessName}
                onChange={handleChange}
                error={errors.businessName ? true : null}
                helperText={errors.businessName ? errors.businessName : null}
              />
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={form.email}
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
                  errors.password ? true : errors.regPassword ? true : null
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
              <Box
                sx={{
                  mb: { xs: 1, sm: 0 },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    lineHeight: 1.57,
                    letterSpacing: '0.00714em',
                  }}
                >
                  Already have an account?{' '}
                  <NextLink
                    href={user ? '/login/user' : '/login/business'}
                    passHref
                  >
                    <Link
                      underline="none"
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      Login
                    </Link>
                  </NextLink>
                </Typography>
              </Box>
              <LoadingButton
                loading={isLoading}
                size="large"
                variant="contained"
                type="submit"
              >
                Sign up
              </LoadingButton>
            </Box>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography
              align="center"
              sx={{
                fontWeight: 500,
                fontSize: '0.875rem',
                lineHeight: 1.57,
                letterSpacing: '0.00714em',
                color: theme.palette.text.secondary,
              }}
            >
              By clicking "Sign up" you agree with our{' '}
              <NextLink href="/terms" passHref>
                <Link underline="none"> company terms and conditions.</Link>
              </NextLink>
            </Typography>
          </Grid>
        </Grid>
      </form>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="verify-email-modal"
        aria-describedby="modal that you can enter your code that was emailed to you to verify your account"
      >
        <Box sx={modalStyle}>
          <VerifyEmail />
        </Box>
      </Modal>
      <GeneralSnack
        generalError={generalError}
        setGeneralError={setGeneralError}
        message={message}
      />
    </Box>
  );
};

export default SignUpForm;
