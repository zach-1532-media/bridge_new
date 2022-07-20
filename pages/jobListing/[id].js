/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../../lib/dbConnect';
import Job from '../../models/Job';
import Business from '../../models/Business';

import JobListing from '../../components/jobListing';

const JobListingPage = ({ business, job }) => (
  <JobListing job={job} business={business} />
);

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  const job = await Job.findById(id);
  const business = await Business.findById(job.businessID);

  return {
    props: {
      business: JSON.parse(JSON.stringify(business)),
      job: JSON.parse(JSON.stringify(job)),
    },
  };
}

JobListingPage.propTypes = {
  business: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
};

export default JobListingPage;
