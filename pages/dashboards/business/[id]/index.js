/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../../../../lib/dbConnect';
import Business from '../../../../models/Business';

import Dash from '../../../../layouts/dash';
import Profile from '../../../../components/dash/shared/profile';

const ProfilePage = ({ business }) => (
  <Dash business={business} userPage={false}>
    <Profile business={business} />
  </Dash>
);

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  const businesses = await Business.findById(id);

  return {
    props: {
      business: JSON.parse(JSON.stringify(businesses)),
    },
  };
}

ProfilePage.propTypes = {
  business: PropTypes.object.isRequired,
};

export default ProfilePage;
