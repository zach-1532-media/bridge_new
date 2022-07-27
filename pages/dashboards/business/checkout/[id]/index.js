import { React, useContext, useEffect } from 'react';

import PropTypes from 'prop-types';

import PostAJobContext from '../../../../../components/contexts/postAJob';

import dbConnect from '../../../../../lib/dbConnect';
import Business from '../../../../../models/Business';

import Checkout from '../../../../../components/checkout';
import Dash from '../../../../../layouts/dash';

const BusinessCheckout = ({ business }) => {
  const form = useContext(PostAJobContext);

  useEffect(() => {
    const postAJob = () => {
      const jobData = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessID: business._id,
          job: form.postAJobform.job,
          city: form.postAJobform.city,
          state: form.postAJobform.state,
          salary: form.postAJobform.salary,
          benefits: form.postAJobform.benefits,
          workType: form.postAJobform.workType,
          description: form.postAJobform.description,
          jobTitle: form.postAJobform.jobTitle,
          hourlyRate: form.postAJobform.hourlyRate,
          travel: form.postAJobform.travel,
          responsibilities: form.postAJobform.responsibilities,
          qualifications: form.postAJobform.qualifications,
        }),
      };
      fetch('/api/postAJob', jobData);
    };
    postAJob();
  });

  return (
    <Dash business={business} userPage={false}>
      <Checkout form={form} />
    </Dash>
  );
};

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  const business = await Business.findById(id);

  return {
    props: {
      business: JSON.parse(JSON.stringify(business)),
    },
  };
}

BusinessCheckout.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  business: PropTypes.object.isRequired,
};

export default BusinessCheckout;
