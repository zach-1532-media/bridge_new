/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import dbConnect from '../../../../../lib/dbConnect';
import Business from '../../../../../models/Business';

import UserBoxLinks from '../../../../../components/shared/layoutLinks/links';
import MenuItems from '../../../../../components/shared/layoutLinks/items';
import Dash from '../../../../../layouts/dash';
import JobStepper from '../../../../../components/JobStepper';

const PostAJob = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;

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
      <JobStepper
        bio={data.bio}
        avatar={data.avatar}
        businessName={data.businessName}
      />
    </Dash>
  );
};

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  const businesses = await Business.findById(id);

  return {
    props: {
      data: JSON.parse(JSON.stringify(businesses)),
    },
  };
}

PostAJob.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PostAJob;
