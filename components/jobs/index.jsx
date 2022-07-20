/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import { React, useState } from 'react';

import PropTypes from 'prop-types';

import Main from '../../layouts/main';
import Container from '../front_components/container';

import JobHero from '../shared/JobHero';

import JobBlock from '../shared/JobBlock';

const Jobs = ({ jobs, isSearchPage }) => {
  const [search, setSearch] = useState('');
  return (
    <Main>
      <Container>
        <JobHero
          isSearchPage={isSearchPage}
          search={search}
          setSearch={setSearch}
        />
      </Container>
      <Container>
        <JobBlock jobs={jobs} />
      </Container>
    </Main>
  );
};

Jobs.propTypes = {
  jobs: PropTypes.array.isRequired,
  isSearchPage: PropTypes.bool,
};

export default Jobs;
