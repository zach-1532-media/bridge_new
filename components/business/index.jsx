import React from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Main from '../../layouts/main';
import Container from '../front_components/container';

import Hero from './components/hero';
import Services from './components/services';
import Features from './components/features';
import Pricing from './components/pricing';

const Business = () => {
  const theme = useTheme();

  return (
    <Main>
      <Box
        position="relative"
        sx={{
          backgroundColor: theme.palette.alternate.main,
          mt: -11,
          pt: 13,
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
      <Box
        sx={{
          backgroundColor: theme.colors.alpha.white[100],
          mt: { xs: '1em' },
        }}
      >
        <Container paddingTop="0 !important">
          <Services />
        </Container>
      </Box>
      <Box bgcolor="alternate.main">
        <Container>
          <Features />
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
      <Box position="relative">
        <Box
          sx={{
            backgroundColor: theme.colors.alpha.white[100],
            mt: -2,
          }}
        >
          <Container>
            <Pricing />
          </Container>
        </Box>
      </Box>
    </Main>
  );
};

export default Business;
