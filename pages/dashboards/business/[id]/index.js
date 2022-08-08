/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import dbConnect from '../../../../lib/dbConnect';
import Business from '../../../../models/Business';

import Dash from '../../../../layouts/dash';
import MenuItems from '../../../../components/shared/layoutLinks/items';
import UserBoxLinks from '../../../../components/shared/layoutLinks/links';
import Profile from '../../../../components/dash/profile';

const ProfilePage = ({ data }) => {
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
      <Profile business={data} />
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

ProfilePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProfilePage;
