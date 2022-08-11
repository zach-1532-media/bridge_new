import React from 'react';
import Box from '@mui/material/Box';

import Hero from './components/hero';
import Main from '../../../../layouts/main';
import Container from '../../../front_components/container';
import Content from './components/content';

const BlogArticle = () => {
  return (
    <Main colorInvert>
      <Box>
        <Hero />
        <Container>
          <Content />
        </Container>
      </Box>
    </Main>
  );
};

export default BlogArticle;
