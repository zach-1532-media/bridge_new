import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Main from '../../layouts/main';
import Container from '../front_components/container';
import Hero from './components/hero';
import Team from './components/team';
import Contact from './components/contact';

const About = () => {
  return (
    <Main colorInvert>
      <Hero />
      <Container>
        <Team />
      </Container>
      <Container maxWidth={800} paddingY="0 !important">
        <Divider />
      </Container>
      <Box bgcolor="alternate.main">
        <Container>
          <Contact />
        </Container>
      </Box>
    </Main>
  );
};

export default About;
