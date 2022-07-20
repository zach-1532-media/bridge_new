/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import { React, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Image from 'next/image';

import /* signIn, useSession */ 'next-auth/client';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Modal from '@mui/material/Modal';

import Container from '../../front_components/container';
import Main from '../../../layouts/main';

import {
  SuccessSnack,
  ExistingBusinessSnack,
  GeneralSnack,
} from '../../shared/snackbars';
import Form from './components/form';
import Backdrop from '../../shared/backdrop';

import Terms from '../../shared/terms';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height: '75%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  overflow: 'scroll',
};

const SignUp = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const router = useRouter();

  // const { data: session, status } = useSession();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    showPassword: false,
  });
  const [openTerms, setTermsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [existingBusinessError, setExistingBusinessError] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const { email } = form;

  const createBusiness = async () => {
    try {
      const newBusiness = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      };
      const response = await fetch('/api/business', newBusiness);
      const data = await response.json();
      if (data.status === 200) {
        setIsSubmitting(false);
        router.replace(`/verifyEmail/${email}`);
      } else if (data.status === 409) {
        setOpenBackdrop(false);
        setExistingBusinessError(true);
      }
    } catch (err) {
      setOpenBackdrop(false);
      setGeneralError(true);
    }
  };

  // Form submit
  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        setOpenBackdrop(true);
        createBusiness();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  // Google Signin send email
  /* useEffect(() => {
    if (status === 'loading') {
      if (session) {
        fetch('/api/welcomeEmail/googleWelcomeEmail', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session.user.email,
          }),
        });
        setOpenBackdrop(false);
      }
    }
  }, [session]); */

  const validate = () => {
    const err = {};
    const regEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    ).test(form.email);
    const regPassword = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ).test(form.password);

    if (!form.firstName) {
      err.firstName = 'Please enter your first name.';
    }

    if (!form.lastName) {
      err.lastName = 'Please enter your first name.';
    }

    if (!form.password) {
      err.password = 'Please enter a password.';
    }

    if (!form.email) {
      err.email = 'Please enter your email.';
    }

    if (!regEmail) {
      err.regEmail = 'Please enter a valid email address';
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

  /* const googleSubmit = async (e) => {
    e.preventDefault();

    setOpenBackdrop(true);

    await signIn('google', {
      redirect: false,
      callbackUrl: 'https://connectatthebridge.com/api/auth/callback/google',
    });
  }; */

  const handleTermsOpen = () => setTermsOpen(true);
  const handleTermsClose = () => setTermsOpen(false);

  return (
    <Main>
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
              <Stack direction="column" spacing={2}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: '2em',
                  }}
                >
                  <Image
                    alt="company logo"
                    src="https://connectatthebridge.nyc3.cdn.digitaloceanspaces.com/site-assets/Bridge.svg"
                    height={150}
                    width={400}
                  />
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ color: 'gray' }}
                  >
                    Sign-Up for The Bridge
                  </Typography>
                </Box>
                <Form form={form} setForm={setForm} errors={errors} />
                <Button
                  fullWidth
                  color="primary"
                  onClick={formSubmit}
                  variant="contained"
                >
                  Sign Up
                </Button>
                {/* 
              <Divider sx={{ width: '100%', mt: '1em' }}>or</Divider>
              <Button
                variant="outlined"
                color="google"
                fullWidth
                disableRipple
                onClick={googleSubmit}
                sx={{
                  height: '3.5em',
                  font: '16px Muli',
                  fontWeight: '400',
                  letterSpacing: '0.01em',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#DF4930',
                    color: 'white',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    width: '25%',
                  }}
                >
                  <Image
                    alt="Sign-Up with google"
                    src="https://connectatthebridge.nyc3.cdn.digitaloceanspaces.com/site-assets/google.svg"
                    height={38}
                    width={38}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '75%',
                    mr: { xs: '3em', md: '5.5em' },
                  }}
                >
                  Sign up with Google

                </Box>
              </Button>
              */}
                <Typography
                  variant="body2"
                  sx={{ color: 'gray', pl: '1em', pr: '1em' }}
                >
                  By clicking the Sign Up buttons, I agree to the&nbsp;
                  <Button
                    disableRipple
                    variant="text"
                    onClick={handleTermsOpen}
                    sx={{
                      '&:hover': {
                        background: 'transparent',
                      },
                      mb: '.2em',
                      ml: '-.5em',
                    }}
                  >
                    terms of service.
                  </Button>
                </Typography>
                {/* Terms Modal */}
                <Modal
                  open={openTerms}
                  onClose={handleTermsClose}
                  aria-labelledby="terms-pop-up"
                  aria-describedby="terms-pop-up"
                >
                  <Box sx={style}>
                    <Terms />
                  </Box>
                </Modal>
              </Stack>
            </Grid>
            <SuccessSnack
              openSuccess={openSuccess}
              setOpenSuccess={setOpenSuccess}
              user
            />
            <ExistingBusinessSnack
              existingBusinessError={existingBusinessError}
              setExistingBusinessError={setExistingBusinessError}
            />
            <GeneralSnack
              generalError={generalError}
              setGeneralError={setGeneralError}
            />

            {/* Picture */}
            {isMd ? (
              <Grid item container justifyContent="center" xs={12} md={6}>
                <Box height={1} width={1} maxWidth={500}>
                  <Box
                    width={1}
                    height={1}
                    sx={{
                      filter:
                        theme.palette.mode === 'dark'
                          ? 'brightness(0.8)'
                          : 'none',
                    }}
                  >
                    <Image
                      alt="two people shaking hands"
                      src="https://connectatthebridge.nyc3.cdn.digitaloceanspaces.com/site-assets/business.svg"
                      height={900}
                      width={600}
                    />
                  </Box>
                </Box>
              </Grid>
            ) : null}
          </Grid>
        </Container>
        <Backdrop openBackdrop={openBackdrop} />
      </Box>
    </Main>
  );
};

export default SignUp;
