/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';

import { signIn, getSession } from 'next-auth/client';

import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckIcon from '@mui/icons-material/Check';

const VerifyEmail = () => {
  const [confirmEmail, setConfirmEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const confirmYourEmail = async (verifyEmail, type, email, password) => {
    const verifyEmailData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verifyEmail),
    };
    const res = await fetch(`/api/${type}/${id}`, verifyEmailData);
    const data = await res.json();
    if (data.case === 1) {
      const sign = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (!sign.error) {
        window.localStorage.removeItem('data');
        const mySession = await getSession();
        router.push(`/dashboards/${mySession.type}/${mySession.id}`);
      }
    } else if (data.case === 2) {
      setLoading(false);
      setMessage(data.message);
    }
  };

  useEffect(() => {
    if (loading) {
      const item = JSON.parse(localStorage.getItem('data'));
      confirmYourEmail(confirmEmail, item.type, item.email, item.password);
    } else {
      setLoading(false);
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        mt: '5em',
        mb: '5em',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '50%',
        }}
      >
        <Typography
          align="center"
          sx={{
            fontWeight: 400,
            fontSize: '3rem',
            lineHeight: 1.167,
            letterSpacing: '0em',
            mb: '2em',
          }}
        >
          Please enter the code that was emailed to you below:
        </Typography>
        <TextField
          fullWidth
          value={confirmEmail}
          name="confirmEmail"
          onChange={(e) => setConfirmEmail(e.target.value)}
          error={message}
          helperText={message}
          sx={{
            mb: '4em',
          }}
        />
        <LoadingButton
          variant="contained"
          startIcon={<CheckIcon />}
          loading={loading}
          onClick={handleSubmit}
        >
          Confirm
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
