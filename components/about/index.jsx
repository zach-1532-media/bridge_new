import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Main from '../../layouts/main';
import Container from '../front_components/container';
import Hero from './components/hero';
import Story from './components/story';
import WhoWeAre from './components/whoWeAre';
import Team from './components/team';
import Contact from './components/contact';

const About = () => {
  return (
    <Main>
      <Hero />
      <Container>
        <Story />
      </Container>
      <Box bgcolor="alternate.main">
        <Container>
          <WhoWeAre />
        </Container>
      </Box>
      <Container maxWidth={800} paddingY="0 !important">
        <Divider />
      </Container>
      <Container>
        <Team />
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
