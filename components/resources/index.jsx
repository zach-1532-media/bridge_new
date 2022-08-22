/* eslint-disable spaced-comment */
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ConstructionIcon from '@mui/icons-material/Construction';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import Main from '../../layouts/main';
import Container from '../front_components/container';
import Hero from './components/hero';
// import FeaturedArticle from './components/featuredArticle';
// import PopularArticles from './components/popularArticles';
import Newsletter from './components/newsletter';

const Resources = () => {
  const theme = useTheme();
  return (
    <Main colorInvert>
      <Hero />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{
            m: '1em',
          }}
        >
          <Typography
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: '3.75rem',
              lineHeight: 1.2,
              letterSpacing: '-0.00833em',
            }}
          >
            Coming Soon!
          </Typography>
          <ConstructionIcon
            sx={{ fontSize: '6em', color: theme.palette.tertiary.main }}
          />
        </Stack>
        <Typography
          align="center"
          sx={{
            fontWeight: 500,
            fontSize: '2.125rem',
            lineHeight: 1.235,
            letterSpacing: '0.00735em',
            mr: '.1em',
            ml: '.1em',
            mb: '1em',
          }}
        >
          Resources to help your career and your business.
        </Typography>
        <Typography
          component="p"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.75,
            letterSpacing: '0.00938em',
            ml: '2em',
            mr: '2em',
            mb: '1em',
          }}
        >
          Welcome to the resources page of The Bridge. Coming soon, we will
          begin to fill this page up with resources that will help with your
          career, no matter what stage you are in. Additionally, we will also be
          using this section to help people with their business as well. From
          how to start a business and raise funding to how to become a better
          marketer and increase sales.
          <br />
          <br />
          We will be calling on individuals and business owners all across
          Columbus to help deliver the best resources and content we can
          provide.
          <br />
          <br />
          If you would like to help collaborate and be a part of this, please
          email us and let us know how you can help.
        </Typography>
      </Box>
      {/*<Container>
        <FeaturedArticle />
      </Container>
      <Box paddingBottom={{ xs: 2, sm: 3, md: 4 }}>
        <Container paddingTop="0 !important">
          <PopularArticles />
        </Container>
      </Box>*/}
      <Container>
        <Newsletter />
      </Container>
    </Main>
  );
};

export default Resources;
