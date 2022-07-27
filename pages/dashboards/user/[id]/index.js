/* eslint-disable react/forbid-prop-types */

/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

import Dash from '../../../../layouts/dash';
import Profile from '../../../../components/dash/shared/profile';

const ProfilePage = ({ user }) => (
  <Dash user={user} userPage>
    <Profile user={user} userPage />
  </Dash>
);

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  const user = await User.findById(id);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfilePage;
