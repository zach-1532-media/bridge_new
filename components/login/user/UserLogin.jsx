import React from 'react';

import Image from 'next/image';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import Main from '../../../layouts/main';
import Container from '../../front_components/container';
import Form from './components/Form';

import signIn from '../../../public/signIn.svg';

const UserLogin = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Main>
      <Box
        minHeight="calc(100vh-247px)"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 1,
        }}
      >
        <Container sx={{ mt: { md: '10em' }, mb: { xs: '3em', md: '15em' } }}>
          <Grid container spacing={6}>
            {isMd ? (
              <Grid item container justifyContent="center" xs={12} md={6}>
                <Box
                  sx={{
                    width: 1,
                    height: 1,
                    maxWidth: 500,
                  }}
                >
                  <Box
                    sx={{
                      width: 1,
                      height: 1,
                      filter:
                        theme.palette.mode === 'dark'
                          ? 'brightness(0.8)'
                          : 'none',
                    }}
                  >
                    <Image
                      alt="sign in"
                      src={signIn}
                      height={600}
                      width={700}
                    />
                  </Box>
                </Box>
              </Grid>
            ) : null}
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              xs={12}
              md={6}
            >
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};

export default UserLogin;
