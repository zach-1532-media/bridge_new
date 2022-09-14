import React from 'react';
import Box from '@mui/material/Box';

import Main from '../../../layouts/main';
import Container from '../../front_components/container';

import Hero from './components/Hero';
import Content from './components/Content';
import Newsletter from '../../resources/components/newsletter';

const BlogArticle = () => {
  return (
    <Main colorInvert>
      <Box>
        <Hero
          avatar="https://res.cloudinary.com/dci8xvvvp/image/upload/v1661125971/assets/nolan_gf0ss6.jpg"
          author="Nolan Vannucci"
          date="Sep 14, 2022"
          title="Are you ready for a change at work?"
          cover="https://res.cloudinary.com/dci8xvvvp/image/upload/v1663179371/blog/Change_2_imndew.jpg"
          subtitle="A guide on what questions you need to ask yourself, how to stand out from the crowd, and what you can expect after you land your new role."
        />
        <Container>
          <Content />
        </Container>
      </Box>
      <Container>
        <Newsletter />
      </Container>
    </Main>
  );
};

export default BlogArticle;
