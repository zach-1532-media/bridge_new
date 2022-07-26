/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Main from '../../layouts/main';
import Container from '../front_components/container';

import Hero from './components/Hero';
import Reviews from './components/Reviews';
import Services from './components/Services';
import Newsletter from './components/Newsletter';
import BottomCOA from './components/BottomCOA';
import {
  SuccessSnack,
  ExistingNewsletterSnack,
  GeneralSnack,
} from '../shared/snackbars';

const Home = () => {
  const theme = useTheme();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [existingNewsletterError, setExistingNewsletterError] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  return (
    <Main>
      {/* Hero Block */}
      <Box
        position="relative"
        sx={{
          backgroundColor: theme.palette.alternate.main,
          marginTop: -11,
          paddingTop: 13,
        }}
      >
        <Container>
          <Hero />
        </Container>
        <Box
          component="svg"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            width: '100%',
            marginBottom: theme.spacing(-1),
          }}
        >
          <path
            fill={theme.palette.background.paper}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          />
        </Box>
      </Box>

      {/* Services Block */}
      <Box sx={{ backgroundColor: theme.colors.alpha.white[100] }}>
        <Container paddingTop="0 !important">
          <Services />
        </Container>
      </Box>

      {/* Newsletter Block */}
      <Box bgcolor="alternate.main">
        <Container>
          <Newsletter
            setOpenSuccess={setOpenSuccess}
            setExistingNewsletterError={setExistingNewsletterError}
            setGeneralError={setGeneralError}
          />
        </Container>
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
          backgroundColor: theme.palette.alternate.main,
        }}
      >
        <path
          fill={theme.colors.alpha.white[100]}
          d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
        />
      </Box>

      {/* Reviews Block */}
      <Box position="relative">
        <Box
          sx={{
            backgroundColor: theme.colors.alpha.white[100],
            mt: -2,
          }}
        >
          <Container>
            <Reviews />
          </Container>
        </Box>
      </Box>

      {/* Bottom Call To Action */}
      <Box bgcolor="alternate.main">
        <Container>
          <BottomCOA />
        </Container>
      </Box>
      <SuccessSnack
        openSuccess={openSuccess}
        setOpenSuccess={setOpenSuccess}
        // eslint-disable-next-line react/jsx-boolean-value
        newsletter={true}
      />
      <ExistingNewsletterSnack
        existingNewsletterError={existingNewsletterError}
        setExistingNewsletterError={setExistingNewsletterError}
      />
      <GeneralSnack
        generalError={generalError}
        setGeneralError={setGeneralError}
      />
    </Main>
  );
};

export default Home;
