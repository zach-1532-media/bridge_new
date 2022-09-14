/* eslint-disable spaced-comment */
import React from 'react';

import Main from '../../layouts/main';
import Container from '../front_components/container';
import Hero from './components/hero';
import Newsletter from './components/newsletter';
import FeaturedArticle from './components/featuredArticle';

const Resources = () => {
  return (
    <Main colorInvert>
      <Hero />
      <Container>
        <FeaturedArticle />
      </Container>
      <Container>
        <Newsletter />
      </Container>
    </Main>
  );
};

export default Resources;
