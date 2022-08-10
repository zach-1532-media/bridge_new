/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../lib/dbConnect';
import Jobs from '../models/Jobs';

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
        searchBar={null}
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

  const jobs = await Jobs.aggregate()
    .lookup({
      from: 'businesses',
      localField: 'businessID',
      foreignField: '_id',
      as: 'business',
    })
    .unwind('business')
    .project(
      'jobTitle business.bio business.avatar business.businessName job workType city state responsibilities qualifications',
    )
    .limit(9);
  const jobsReverse = jobs.reverse();

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobsReverse)),
    },
  };
}

JobPage.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      jobTitle: PropTypes.string,
      business: PropTypes.shape({
        bio: PropTypes.string,
        avatar: PropTypes.string,
        businessName: PropTypes.string,
      }),
      job: PropTypes.string,
      workType: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      responsibilities: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          responsibility: PropTypes.string,
        }),
      ),
      qualifications: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          qualification: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

export default JobPage;
