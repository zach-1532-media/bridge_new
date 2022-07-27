/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../../../../../lib/dbConnect';
import Business from '../../../../../models/Business';

import Dash from '../../../../../layouts/dash';
import JobStepper from '../../../../../components/JobStepper';

const PostAJob = ({ business }) => {
  return (
    <Dash business={business} userPage={false}>
      <JobStepper id={business._id} bio={business.bio} />
    </Dash>
  );
};

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  const businesses = await Business.findById(id);

  return {
    props: {
      business: JSON.parse(JSON.stringify(businesses)),
    },
  };
}

PostAJob.propTypes = {
  business: PropTypes.object.isRequired,
};

export default PostAJob;
