/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Main from '../../layouts/main';
import Container from '../front_components/container';
import Application from './components/application';
import MainSection from './components/mainSection';
import Newsletter from './components/newsletter';

const JobListing = ({ job, business }) => (
  <Main>
    <Container>
      <MainSection job={job} business={business} />
    </Container>
    <Box bgcolor="alternate.main">
      <Container>
        <Application />
      </Container>
    </Box>
    <Container>
      <Newsletter />
    </Container>
  </Main>
);

JobListing.propTypes = {
  job: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired,
};

export default JobListing;
