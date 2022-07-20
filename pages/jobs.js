/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../lib/dbConnect';
import Job from '../models/Job';

import Main from '../layouts/main/index';
import Container from '../components/front_components/container';
import JobBlock from '../components/shared/JobBlock';
import JobHero from '../components/shared/JobHero';
import ExploreButton from '../components/shared/JobHero/components/exploreButton';
import HeroImage from '../components/shared/JobHero/components/heroImage';

const JobPage = ({ jobs }) => (
  <Main>
    <Container>
      <JobHero
        searchBar={<></>}
        image={<HeroImage />}
        exploreButton={<ExploreButton />}
      />
    </Container>
    <Container>
      <JobBlock jobs={jobs} />
    </Container>
  </Main>
);

export async function getServerSideProps() {
  await dbConnect();
  // eslint-disable-next-line global-require
  require('../models/Business');

  const jobs = await Job.aggregate().lookup({
    from: 'businesses',
    localField: 'businessID',
    foreignField: '_id',
    as: 'business',
  });
  const jobsReverse = jobs.reverse();

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobsReverse)),
    },
  };
}

JobPage.propTypes = {
  jobs: PropTypes.array.isRequired,
};

export default JobPage;
