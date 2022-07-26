import { React, useEffect } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import dbConnect from '../../../../../lib/dbConnect';
import Business from '../../../../../models/Business';
import Job from '../../../../../models/Job';

import Dash from '../../../../../layouts/dash';

const JobConfirmation = ({ business, job }) => {
  const router = useRouter();
  const id = router.query.id;
  const paymentID = router.query.payment_intent;

  useEffect(() => {
    const verifyJob = async () => {
      const res = await fetch('/api/verifyJobPost', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobID: job[0]._id,
          paymentID: paymentID,
        }),
      });
      const data = await res.json();
    };
    verifyJob();
  });

  return (
    <Dash business={business} userPage={false}>
      <h1>{id}</h1>
    </Dash>
  );
};

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  const business = await Business.findById(id);
  const oobiedoobie = await Job.find({ businessID: id })
    .sort({ _id: -1 })
    .limit(1);

  return {
    props: {
      business: JSON.parse(JSON.stringify(business)),
      job: JSON.parse(JSON.stringify(oobiedoobie)),
    },
  };
}

JobConfirmation.propTypes = {
  business: PropTypes.object.isRequired,
  job: PropTypes.array,
};

export default JobConfirmation;
