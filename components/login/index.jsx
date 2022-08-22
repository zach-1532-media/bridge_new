/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';

import Image from 'next/image';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import Form from './form';
import Main from '../../layouts/main';
import Container from '../front_components/container';

const Login = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Main>
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh-247px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 1,
        }}
      >
        <Container>
          <Grid container spacing={6}>
            {isMd ? (
              <Grid
                item
                container
                xs={12}
                md={6}
                sx={{ justifyContent: 'center' }}
              >
                <Box
                  sx={{
                    height: 1,
                    width: 1,
                    maxWidth: 500,
                  }}
                >
                  <Image
                    alt="login"
                    src="https://res.cloudinary.com/dci8xvvvp/image/upload/v1660326715/assets/login_gz1fqq.svg"
                    width={793}
                    height={552}
                  />
                </Box>
              </Grid>
            ) : null}
            <Grid
              item
              container
              xs={12}
              md={6}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};

export default Login;
