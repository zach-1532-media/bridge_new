/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */

import { React, useState } from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../lib/dbConnect';
import Job from '../models/Job';

import Main from '../layouts/main/index';
import Container from '../components/front_components/container';
import JobBlock from '../components/shared/JobBlock';
import JobHero from '../components/shared/JobHero';
import SearchBar from '../components/shared/searchbar';

const JobSearchPage = ({ jobs }) => {
  const [search, setSearch] = useState('');
  return (
    <Main>
      <Container>
        <JobHero
          search={search}
          setSearch={setSearch}
          searchBar={<SearchBar search={search} setSearch={setSearch} />}
          image={null}
          exploreButton={null}
        />
      </Container>
      <Container>
        <JobBlock jobs={jobs} />
      </Container>
    </Main>
  );
};
export async function getServerSideProps({ query: { search } }) {
  await dbConnect();
  // eslint-disable-next-line global-require
  require('../models/Business');

  const jobs = !search
    ? await Job.aggregate()
        .lookup({
          from: 'businesses',
          localField: 'businessID',
          foreignField: '_id',
          as: 'business',
        })
        .unwind('business')
        .project(
          'jobTitle business.bio job workType city state responsibilities qualifications',
        )
    : await Job.aggregate()
        .search({
          index: 'Job Search',
          text: {
            query: search,
            path: ['jobTitle', 'description'],
            fuzzy: {},
          },
        })
        .lookup({
          from: 'businesses',
          localField: 'businessID',
          foreignField: '_id',
          as: 'business',
        })
        .unwind('business')
        .project(
          'jobTitle business.bio job workType city state responsibilities qualifications',
        );

  const jobsReverse = jobs.reverse();

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobsReverse)),
    },
  };
}

JobSearchPage.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      jobTitle: PropTypes.string,
      business: PropTypes.shape({
        bio: PropTypes.string,
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

export default JobSearchPage;
