/* eslint-disable no-shadow */
import { React, useEffect } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import dbConnect from '../../../../../lib/dbConnect';
import Business from '../../../../../models/Business';

import UserBoxLinks from '../../../../../components/shared/layoutLinks/links';
import MenuItems from '../../../../../components/shared/layoutLinks/items';

import Dash from '../../../../../layouts/dash';

const JobConfirmation = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const item = localStorage.getItem('form');
    const form = JSON.parse(item);
    const paymentID = router.query.payment_intent;
    const { id } = router.query;
    const postAJob = () => {
      const jobData = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job: form.job,
          city: form.city,
          state: form.state,
          salary: form.salary ?? '',
          benefits: form.benefits,
          workType: form.workType,
          description: form.description,
          jobTitle: form.jobTitle,
          houlryRate: form.houlryRate ?? '',
          travel: form.travel,
          responsibilities: form.responsibilities,
          qualifications: form.qualifications,
          paymentID,
        }),
      };
      fetch(`/api/jobs/${id}`, jobData);
    };
    postAJob();
  });

  return (
    <Dash
      data={data}
      items={<MenuItems id={id} type="business" path={router.asPath} />}
      links={
        <UserBoxLinks
          id={id}
          avatar={data.avatar}
          sessionName={data.sessionName}
          businessName={data.businessName}
          type="business"
        />
      }
    >
      <h1>Confirmation Page</h1>
    </Dash>
  );
};

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  const business = await Business.findById(id);

  return {
    props: {
      data: JSON.parse(JSON.stringify(business)),
    },
  };
}

JobConfirmation.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  data: PropTypes.object.isRequired,
};

export default JobConfirmation;
