/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable global-require */
import { React, useEffect } from 'react';

import { useRouter } from 'next/router';

import { getSession } from 'next-auth/client';

import PropTypes from 'prop-types';

import dbConnect from '../../../../../lib/dbConnect';
import Business from '../../../../../models/Business';

import Confirmation from '../../../../../components/confirmation';
import UserBoxLinks from '../../../../../components/shared/layoutLinks/links';
import MenuItems from '../../../../../components/shared/layoutLinks/items';

import Dash from '../../../../../layouts/dash';

const JobConfirmation = ({ data, paymentInfo }) => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const item = localStorage.getItem('jobForm');
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
      <Confirmation />
    </Dash>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (session.type === 'user') {
    return {
      redirect: {
        destination: `/dashboards/user/${session.id}`,
        permanent: false,
      },
    };
  }

  const { id, payment_intent } = ctx.query;

  const stripe = require('stripe')(process.env.STRIPE_SECRET);
  await dbConnect();

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
  const business = await Business.findById(id);

  return {
    props: {
      data: JSON.parse(JSON.stringify(business)),
      paymentInfo: JSON.parse(JSON.stringify(paymentIntent)),
    },
  };
}

JobConfirmation.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  data: PropTypes.object.isRequired,
  paymentInfo: PropTypes.object.isRequired,
};

export default JobConfirmation;
