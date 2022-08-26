/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Image from 'next/image';

import Typed from 'react-typed';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CircularProgress from '@mui/material/CircularProgress';

const listItems = [
  {
    item: 'Job Market News',
  },
  {
    item: 'Interview Tips',
  },
  {
    item: 'Local Networking Events',
  },
  {
    item: 'And Much More!',
  },
];

const Newsletter = ({ setOpenSuccess, setGeneralError, setMessage }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [form, setForm] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const addToNewsletterContact = async () => {
      const newsletter = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation: 'add contact', email: form.email }),
      };
      const res = await fetch('/api/emails/users', newsletter);
      const data = await res.json();
      if (data.case === 1) {
        const newsletterMongo = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ operation: 'mongo', email: form.email }),
        };
        const mongoRes = await fetch('/api/emails/users', newsletterMongo);
        const mongoData = await mongoRes.json();
        if (mongoData.case === 1) {
          setIsSubmitting(false);
          setIsLoading(false);
          setMessage(data.message);
          setOpenSuccess(true);
        } else {
          setIsSubmitting(false);
          setIsLoading(false);
          setGeneralError(true);
        }
      } else if (data.case === 2) {
        setIsSubmitting(false);
        setIsLoading(false);
        setGeneralError(true);
      }
    };
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        setIsLoading(true);
        addToNewsletterContact();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [
    errors,
    form.email,
    isSubmitting,
    setGeneralError,
    setMessage,
    setOpenSuccess,
  ]);

  const validate = () => {
    const err = {};
    const regEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    ).test(form.email);

    if (!form.email) {
      err.email = 'Please enter your email';
    }

    if (!regEmail) {
      err.regEmail = 'Please enter a valid email address';
    }
    return err;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} data-aos="fade-up">
          <Box maxWidth={400} margin="0 auto">
            <Card
              sx={{
                backgroundImage: 'none',
                boxShadow: 4,
              }}
            >
              <CardMedia
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  height={{ xs: 240, sm: 340, md: 280 }}
                  width={1}
                  sx={{
                    objectFit: 'cover',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    alt="illustration of woman holding an envelope"
                    src="https://res.cloudinary.com/dci8xvvvp/image/upload/v1660228008/assets/newsletter_yxabta.svg"
                    height={300}
                    width={300}
                  />
                </Box>
                <Box
                  component="svg"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1920 100.1"
                  sx={{
                    width: '100%',
                    bottom: 0,
                    position: 'absolute',
                  }}
                >
                  <path
                    fill={theme.colors.alpha.white[100]}
                    d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                  />
                </Box>
              </CardMedia>
              <CardContent>
                <Grid container spacing={2}>
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
                        errors.email ? true : errors.regEmail ? true : null
                      }
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
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={formSubmit}
                      loading={isLoading}
                      loadingIndicator={
                        <CircularProgress
                          size={16}
                          sx={{ color: theme.palette.tertiary.main }}
                        />
                      }
                    >
                      Submit
                    </LoadingButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={6}
          data-aos="fade-up"
        >
          <Box>
            <Box marginBottom={2}>
              <Typography
                align={isMd ? 'left' : 'center'}
                variant="h2"
                sx={{ fontWeight: 700 }}
                gutterBottom
              >
                The best resource ever created for
                <br />{' '}
                <Typography color="primary" component="span" variant="inherit">
                  <Typed
                    strings={['professionals', 'freelancers', 'success']}
                    typeSpeed={100}
                    loop
                  />
                </Typography>
              </Typography>
              <Typography
                align={isMd ? 'left' : 'center'}
                color="text.secondary"
              >
                Connect At The Bridge - Our bi-monthly newsletter that provides
                you with insight on the current job market, tips to become a
                better candidate, and keeps you up to date with industry events
                in your area.
              </Typography>
            </Box>
            <Box>
              <Box width="100%" justifyContent="center" alignItems="center">
                {listItems.map((item) => (
                  <ListItem key={item.item}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          background: theme.palette.tertiary.main,
                          height: 20,
                          width: 20,
                        }}
                      >
                        <svg
                          width={12}
                          height={12}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.item} />
                  </ListItem>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Newsletter.propTypes = {
  setOpenSuccess: PropTypes.func.isRequired,
  setGeneralError: PropTypes.func.isRequired,
};

export default Newsletter;
