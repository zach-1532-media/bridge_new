import React from 'react';

import Box from '@mui/material/Box';

import Main from '../../layouts/main';
import Container from '../front_components/container';
import Hero from './components/hero';
import FeaturedArticle from './components/featuredArticle';
import PopularArticles from './components/popularArticles';
import Newsletter from './components/newsletter';

const Resources = () => {
  return (
    <Main colorInvert>
      <Hero />
      <Container>
        <FeaturedArticle />
      </Container>
      <Box paddingBottom={{ xs: 2, sm: 3, md: 4 }}>
        <Container paddingTop="0 !important">
          <PopularArticles />
        </Container>
      </Box>
      <Container>
        <Newsletter />
      </Container>
    </Main>
  );
};

export default Resources;
